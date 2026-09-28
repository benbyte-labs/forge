use std::path::PathBuf;
use tauri::Manager;

fn state_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    app.path()
        .app_data_dir()
        .map_err(|e| format!("no app data dir: {e}"))
}

fn state_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    Ok(state_dir(app)?.join("state.json"))
}

#[tauri::command]
fn load_state(app: tauri::AppHandle) -> Result<Option<String>, String> {
    let path = state_path(&app)?;
    match std::fs::read_to_string(&path) {
        Ok(s) => Ok(Some(s)),
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

/// Write via a temp file and rename, so an interrupted write cannot leave a
/// truncated state.json behind.
#[tauri::command]
fn save_state(app: tauri::AppHandle, text: String) -> Result<(), String> {
    let path = state_path(&app)?;
    if let Some(dir) = path.parent() {
        std::fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    }
    let tmp = path.with_extension("json.tmp");
    std::fs::write(&tmp, text).map_err(|e| e.to_string())?;
    std::fs::rename(&tmp, &path).map_err(|e| e.to_string())
}

/// Keep a copy of a state file we could not read, so nothing is destroyed by
/// the app starting fresh over it.
#[tauri::command]
fn backup_state(app: tauri::AppHandle, text: String) -> Result<(), String> {
    let dir = state_dir(&app)?;
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let stamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0);
    std::fs::write(dir.join(format!("state.broken.{stamp}.json")), text).map_err(|e| e.to_string())
}

#[tauri::command]
fn export_text(path: String, text: String) -> Result<(), String> {
    std::fs::write(path, text).map_err(|e| e.to_string())
}

#[tauri::command]
fn state_location(app: tauri::AppHandle) -> Result<String, String> {
    Ok(state_path(&app)?.to_string_lossy().to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            load_state,
            save_state,
            backup_state,
            export_text,
            state_location
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
