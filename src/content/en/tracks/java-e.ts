import type { Day } from '../../types';

/** JAVA track, days 25-30. */
export const javaEnE: Day[] = [
  {
    day: 25,
    title: 'Unit testing with JUnit',
    minutes: 22,
    lesson: [
      { k: 'text', md: '**JUnit 5** is the standard Java test framework. A test is a method with a `@Test` annotation — that is the whole barrier to entry.' },
      { k: 'code', lang: 'java', src: 'import org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass RoverTest {\n\n    private Rover rover;\n\n    @BeforeEach\n    void setUp() {\n        rover = new Rover("Alpha");     // a fresh instance before each test\n    }\n\n    @Test\n    void newRoverStartsWithFullBattery() {\n        assertEquals(100, rover.getBattery());\n    }\n\n    @Test\n    void blankNameThrows() {\n        assertThrows(IllegalArgumentException.class,\n                     () -> new Rover(""));\n    }\n}', explain: '`@BeforeEach` runs before every test, so each one starts from a fresh state. Without it the order of tests would matter — the worst kind of fragility.' },
      { k: 'callout', tone: 'key', md: 'A test name should be a **sentence**, not a label. `newRoverStartsWithFullBattery` tells you what is expected; `test1` tells you nothing. On a failure the test name is the first thing you see — make it understandable on its own.' },
      { k: 'text', md: 'The assertions you will use most:\n\n- `assertEquals(expected, actual)` — the order matters in the failure message\n- `assertTrue` / `assertFalse`\n- `assertThrows(Exception.class, () -> ...)` — for error paths\n- `assertAll(...)` — several assertions together, all run even if one fails\n- `assertNotNull`' },
      { k: 'callout', tone: 'warn', md: '**Tests that depend on each other** are the commonest mistake. If one test builds on state left by the previous one, it fails when run alone and the cause takes hours to find. Every test must be **self-contained**.' },
      { k: 'text', md: 'A **parameterised test** shortens the checking of many cases:\n\n```java\n@ParameterizedTest\n@ValueSource(ints = {0, 1, 50, 99, 100})\nvoid validBatteryLevelsAccepted(int level) {\n    assertDoesNotThrow(() -> new Rover("A", level));\n}\n```' },
    ],
    quiz: [
      { k: 'single', q: 'What does `@BeforeEach` do?', opts: ['Runs once', 'Runs before every test, giving a fresh state', 'Runs after the test'], answer: 1, why: 'Without it the order of tests would matter, the worst kind of fragility.' },
      { k: 'single', q: 'What should a test name be?', opts: ['Short, like `test1`', 'A sentence saying what is expected', 'The method name'], answer: 1, why: 'On a failure the test name is the first thing you see; make it self-explanatory.' },
      { k: 'single', q: 'How do you test an exception?', opts: ['With try-catch', '`assertThrows(Exception.class, () -> ...)`', 'You cannot'], answer: 1, why: 'It fails if nothing is thrown, and also if the wrong type is thrown.' },
      { k: 'single', q: 'What is wrong with interdependent tests?', opts: ['They are slow', 'They fail when run alone and the cause takes hours to find', 'They are long'], answer: 1, why: 'Every test must be self-contained.' },
      { k: 'single', q: 'What is `@ParameterizedTest` for?', opts: ['Speed', 'Running one test with many inputs', 'Parallelism'], answer: 1, why: '`@ValueSource` lists the cases and the test runs for each.' },
    ],
    note: {
      summary: ['JUnit 5: a test is a method annotated `@Test`.', '`@BeforeEach` gives a fresh state before every test.', 'A test name should be a sentence, not a label.', 'Assertions: assertEquals, assertTrue, assertThrows, assertAll.', 'Every test must be self-contained.', '`@ParameterizedTest` covers many inputs with one test.'],
      terms: [{ term: 'JUnit', def: 'The standard Java unit testing framework.' }, { term: '@BeforeEach', def: 'A setup method running before every test.' }, { term: 'parameterised test', def: 'The same test run with several input values.' }],
    },
  },
  {
    day: 26,
    title: 'Threads basics',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'A **thread** is a parallel line of execution. A program can work on several threads at once — which is what makes it fast, and what makes it hard to debug.' },
      { k: 'code', lang: 'java', src: '// Not like this: raw thread handling\nThread t = new Thread(() -> System.out.println("running"));\nt.start();\nt.join();\n\n// Like this: an executor service\ntry (var pool = Executors.newFixedThreadPool(4)) {\n    Future<Integer> result = pool.submit(() -> compute(42));\n    System.out.println(result.get());\n}', explain: 'A raw `Thread` is rarely justified. `ExecutorService` manages the thread lifecycle, and `Future` returns the result — or throws the error if the task failed.' },
      { k: 'callout', tone: 'key', md: 'The central problem is the **race condition**: two threads modify the same data and the outcome depends on which gets there first. `counter++` for instance is **not atomic**: read, increment, write back — three steps you can be interrupted in the middle of.' },
      { k: 'text', md: 'Three answers, simplest first:\n\n- **Do not share state** — the best answer when it is possible\n- **Immutable objects** — what cannot change has no race condition\n- **`AtomicInteger`, `ConcurrentHashMap`** — ready-made thread-safe classes\n- **`synchronized` or `ReentrantLock`** — only when the above do not suffice' },
      { k: 'callout', tone: 'warn', md: '**Deadlock** happens when two threads wait on each other locks. The remedy: always acquire locks in the **same order** and hold them as briefly as possible. A deadlock throws no exception — the program simply stops, which is the hardest fault to find.' },
      { k: 'callout', tone: 'tip', md: 'The most reliable concurrency is the kind you **do not write**. `parallelStream()`, `ExecutorService` and `CompletableFuture` cover most tasks. A hand-written `synchronized` block only when there really is no other way.' },
    ],
    quiz: [
      { k: 'single', q: 'What should you use instead of a raw `Thread`?', opts: ['Nothing', '`ExecutorService` and `Future`', 'Only `synchronized`'], answer: 1, why: 'It manages the thread lifecycle, and `Future` returns the result or the error.' },
      { k: 'single', q: 'Why is `counter++` not thread safe?', opts: ['It is slow', 'Because it is three steps: read, increment, write back', 'Because it is an `int`'], answer: 1, why: 'Another thread can cut in between the steps and one increment is lost.' },
      { k: 'single', q: 'What is the best answer to a race condition?', opts: ['`synchronized` everywhere', 'Do not share state', 'Slow it down'], answer: 1, why: 'With no shared mutable state there is no race condition.' },
      { k: 'single', q: 'What is a deadlock?', opts: ['Two threads waiting on each other locks', 'One thread hanging', 'Running out of memory'], answer: 0, why: 'It throws no exception: the program simply stops. The hardest fault to find.' },
      { k: 'single', q: 'How do you prevent deadlock?', opts: ['More threads', 'Always acquire locks in the same order', 'Longer locks'], answer: 1, why: 'And hold locks for as short a time as possible.' },
    ],
    note: {
      summary: ['A thread is a parallel line of execution.', 'Use `ExecutorService` and `Future` instead of a raw `Thread`.', 'Race condition: `counter++` is three steps, not atomic.', 'In order: do not share, immutable, Atomic classes, locks last.', 'Deadlock: mutual waiting; consistent lock order is the remedy.', 'The best concurrency is the kind you do not write yourself.'],
      terms: [{ term: 'race condition', def: 'Two threads modifying the same data with a timing-dependent result.' }, { term: 'deadlock', def: 'Two threads each waiting on the other lock.' }, { term: 'ExecutorService', def: 'A service managing the lifecycle of threads.' }],
    },
  },
  {
    day: 27,
    title: 'Memory and garbage collection',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Java frees memory automatically — but that does not mean you need not understand how. Most performance problems come from memory handling.' },
      { k: 'callout', tone: 'key', md: 'Memory has two parts:\n\n- **Stack** — per thread; it holds local variables and references. It empties automatically on return.\n- **Heap** — shared; it holds the objects. This is what the garbage collector cleans.' },
      { k: 'text', md: 'The **garbage collector** (GC) frees what has **no reachable reference** left. It does not collect "unused" objects but **unreachable** ones — and that difference is where Java memory leaks come from.' },
      { k: 'code', lang: 'java', src: '// A classic leak: the list grows forever\npublic class Log {\n    private static final List<String> LINES = new ArrayList<>();\n\n    public static void write(String s) {\n        LINES.add(s);          // nothing is ever removed\n    }\n}\n\n// The fix: a bounded store or a weak reference\nprivate static final int MAX = 1000;\npublic static void write(String s) {\n    if (LINES.size() >= MAX) LINES.remove(0);\n    LINES.add(s);\n}', explain: 'A static collection is never freed, because the class lives until the program ends. It is the number one source of memory leaks in Java.' },
      { k: 'callout', tone: 'warn', md: '**Generational garbage collection** rests on the observation that most objects **die very young**. Hence a young and an old generation: the young is collected often and quickly, the old rarely and slowly. When many objects survive youth, the GC becomes expensive.' },
      { k: 'callout', tone: 'tip', md: 'Do not try to "help" the collector. A `System.gc()` call is not a command but a suggestion, and usually makes things worse. If the GC is the bottleneck, the answer is **creating fewer objects**, not collecting more often.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the difference between the stack and the heap?', opts: ['The stack is per thread with locals; the heap is shared with objects', 'The stack is bigger', 'No difference'], answer: 0, why: 'The stack empties automatically; the heap is cleaned by the collector.' },
      { k: 'single', q: 'What does the garbage collector free?', opts: ['Unused objects', 'Unreachable objects', 'Old objects'], answer: 1, why: 'An object no longer used but still referenced is not freed — that is a leak.' },
      { k: 'single', q: 'What is the number one source of Java memory leaks?', opts: ['Too many objects', 'A static collection that is never emptied', 'Large arrays'], answer: 1, why: 'A static field lives with its class until the program ends.' },
      { k: 'single', q: 'What does generational GC rest on?', opts: ['Object size', 'The fact that most objects die very young', 'The number of threads'], answer: 1, why: 'The young generation is collected often and quickly, the old rarely and slowly.' },
      { k: 'single', q: 'What should you do if the GC is the bottleneck?', opts: ['Call `System.gc()` more often', 'Create fewer objects', 'Add more threads'], answer: 1, why: '`System.gc()` is only a suggestion and usually makes things worse.' },
    ],
    note: {
      summary: ['Stack: per-thread locals. Heap: shared objects.', 'The GC frees unreachable objects, not unused ones.', 'A static collection is the number one leak source.', 'Generational GC: the young generation is cleaned fast, the old slowly.', '`System.gc()` is only a suggestion and usually makes things worse.', 'For a GC bottleneck, create fewer objects.'],
      terms: [{ term: 'heap', def: 'The shared memory area where objects live.' }, { term: 'reachability', def: 'Whether any live root still references the object.' }, { term: 'generational GC', def: 'Collection treating young and old objects separately.' }],
    },
  },
  {
    day: 28,
    title: 'Debugging in an IDE',
    minutes: 22,
    lesson: [
      { k: 'text', md: '`System.out.println` works for a while. A **debugger** stops the program exactly where you want and shows you everything that is true at that moment.' },
      { k: 'callout', tone: 'key', md: 'The four basic operations are the same in every IDE:\n\n- **Step Over** (F8) — the next line, stepping over calls\n- **Step Into** (F7) — enter the called method\n- **Step Out** (Shift+F8) — leave the current method\n- **Resume** (F9) — on to the next breakpoint' },
      { k: 'text', md: 'A **conditional breakpoint** is the highest-return tool there is. Right click the breakpoint and give it a condition: `rover.getBattery() < 10`. You then do not have to step a thousand times to reach the failing case — the program stops by itself when it gets interesting.' },
      { k: 'callout', tone: 'tip', md: 'An **exception breakpoint** helps when you do not know where an error comes from: it stops the program the moment the given exception is created, before the stack unwinds. You then see the whole state, not just the trace.' },
      { k: 'text', md: 'Other tools worth knowing:\n\n- **Evaluate Expression** — evaluate any expression at run time\n- **Watches** — monitored expressions that refresh at every step\n- **Drop Frame** — step back to the start of a method and run it again\n- **Hot Swap** — replace a method body without restarting' },
      { k: 'callout', tone: 'warn', md: 'With threaded code the debugger **changes the timing**: a breakpoint stops one thread and the race condition disappears. That is called a heisenbug. Logging is the better tool there — or set the breakpoint to suspend only the one thread.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the difference between Step Over and Step Into?', opts: ['Step Into enters the called method', 'Step Over is faster', 'No difference'], answer: 0, why: 'When the bug is not in the called method, Step Over gets you there sooner.' },
      { k: 'single', q: 'What is a conditional breakpoint for?', opts: ['Speed', 'Stopping only when the given condition holds', 'Logging'], answer: 1, why: 'You need not step a thousand times to reach the failing case.' },
      { k: 'single', q: 'When is an exception breakpoint useful?', opts: ['Always', 'When you do not know where an exception comes from', 'In threaded code'], answer: 1, why: 'It stops the moment the exception is created, before the stack unwinds.' },
      { k: 'single', q: 'What does Drop Frame do?', opts: ['Clears the stack', 'Steps back to the start of a method so you can run it again', 'Exits the program'], answer: 1, why: 'Useful when you have stepped past the line you wanted to inspect.' },
      { k: 'single', q: 'What is a heisenbug in threaded code?', opts: ['A memory error', 'The breakpoint changes the timing and the bug disappears', 'A compile error'], answer: 1, why: 'Logging is the better tool, or suspend only the one thread at the breakpoint.' },
    ],
    note: {
      summary: ['Basics: Step Over, Step Into, Step Out, Resume.', 'A conditional breakpoint is the highest-return tool.', 'An exception breakpoint stops when the exception is created.', 'Evaluate Expression, Watches, Drop Frame, Hot Swap.', 'In threaded code the debugger changes the timing (heisenbug).', 'Then log instead, or suspend only one thread.'],
      terms: [{ term: 'conditional breakpoint', def: 'A breakpoint that only triggers under a given condition.' }, { term: 'exception breakpoint', def: 'A breakpoint triggering when an exception is created.' }, { term: 'heisenbug', def: 'A bug that disappears the moment you observe it.' }],
    },
  },
  {
    day: 29,
    title: 'A small application',
    minutes: 26,
    lesson: [
      { k: 'text', md: 'Time to assemble everything into a working program. The example: a robot fleet register that reads from a file, filters, computes statistics and writes back.' },
      { k: 'text', md: 'The layers worth separating:\n\n- **Model** — a `Rover` record: name, battery level, position\n- **Repository** — `RoverRepository`: loading and saving from file\n- **Service** — `FleetService`: filtering, statistics, business rules\n- **Interface** — `Main`: command-line arguments and output' },
      { k: 'code', lang: 'java', src: 'public record Rover(String name, int battery, int x, int y) {\n    public Rover {\n        if (name == null || name.isBlank())\n            throw new IllegalArgumentException("Name is required");\n        if (battery < 0 || battery > 100)\n            throw new IllegalArgumentException("Battery 0 to 100: " + battery);\n    }\n\n    public boolean operable() { return battery > 5; }\n}', explain: 'A **record** (since Java 16) is an immutable data class: the constructor, accessors, `equals`, `hashCode` and `toString` are generated. Validation goes in the compact constructor.' },
      { k: 'callout', tone: 'key', md: 'The practical benefit of separating layers is **testability**. `FleetService` knows nothing about files, so it can be tested with an in-memory list — no file writing per test. That is what makes the tests fast and reliable.' },
      { k: 'code', lang: 'java', src: 'public class FleetService {\n    private final List<Rover> rovers;\n\n    public FleetService(List<Rover> rovers) {\n        this.rovers = List.copyOf(rovers);       // defensive copy\n    }\n\n    public List<Rover> weak(int threshold) {\n        return rovers.stream()\n            .filter(r -> r.battery() < threshold)\n            .sorted(Comparator.comparingInt(Rover::battery))\n            .toList();\n    }\n\n    public double averageBattery() {\n        return rovers.stream().mapToInt(Rover::battery).average().orElse(0);\n    }\n}', explain: '`List.copyOf` makes a **defensive copy**: the caller cannot change the list behind your back later. One line, and it prevents a lot of hidden bugs.' },
      { k: 'callout', tone: 'warn', md: 'The **`Main` class should hold no business logic**. Read the arguments, call the service, print the result — and nothing more. As soon as `main` runs past twenty lines, something has landed in the wrong place.' },
    ],
    quiz: [
      { k: 'single', q: 'What is a record?', opts: ['A file type', 'An immutable data class with generated code', 'A collection'], answer: 1, why: 'Constructor, accessors, equals, hashCode and toString are automatic.' },
      { k: 'single', q: 'Where does record validation go?', opts: ['In a separate method', 'In the compact constructor', 'In the accessors'], answer: 1, why: 'The object can then never exist in an invalid state.' },
      { k: 'single', q: 'What is the main benefit of separating layers?', opts: ['Faster execution', 'Testability: the service can be tested without files', 'Less code'], answer: 1, why: 'No file writing per test, which makes the tests fast and reliable.' },
      { k: 'single', q: 'What is `List.copyOf` for?', opts: ['Speed', 'A defensive copy: the caller cannot change the list later', 'Sorting'], answer: 1, why: 'One line, and it prevents a lot of hidden bugs.' },
      { k: 'single', q: 'What belongs in `Main`?', opts: ['All the logic', 'Reading arguments, calling the service, printing — nothing more', 'The tests'], answer: 1, why: 'If `main` runs past twenty lines, something landed in the wrong place.' },
    ],
    note: {
      summary: ['Layers: model, repository, service, interface.', 'A record is an immutable data class with generated code.', 'Validation goes in the compact constructor.', 'The main benefit of layering is testability.', '`List.copyOf` makes a defensive copy.', '`Main` should hold no business logic.'],
      terms: [{ term: 'record', def: 'An immutable data class with generated members.' }, { term: 'defensive copy', def: 'A copy preventing outside modification.' }, { term: 'layering', def: 'Separating responsibilities into model, repository and service.' }],
    },
  },
  {
    day: 30,
    title: 'The complete project',
    minutes: 30,
    lesson: [
      { k: 'text', md: 'In thirty days you have covered the whole core of Java. Now look at how it assembles into a real, finished project — and what comes next.' },
      { k: 'callout', tone: 'key', md: 'What a finished Java project contains:\n\n- **Source** in `src/main/java`, tests in `src/test/java` (day 24)\n- **`pom.xml`** with pinned dependency versions\n- **Tests** for every business rule (day 25)\n- **README** — what it does, how to build it, how to run it\n- **`.gitignore`** — `target/`, IDE files\n- **A runnable JAR** or launch script' },
      { k: 'text', md: 'Three signs of quality visible in the code:\n\n1. **Small methods that do one thing** — if a method does not fit on a screen, it should be two\n2. **Meaningful names** — a good name replaces a comment\n3. **A narrow public surface** — everything `private` that is not needed outside (day 9)' },
      { k: 'callout', tone: 'warn', md: '**"I will fix it later"** is the most expensive sentence in programming. What takes five minutes today takes half a day in three months, because by then you have forgotten how it works and five places use it. If you will not fix it now, at least add a `// TODO` saying **why** it is like that.' },
      { k: 'text', md: 'Where to go next, once this is in place:\n\n- **Spring Boot** — for web applications and REST APIs; the backbone of enterprise Java\n- **JDBC and JPA** — database access\n- **Design patterns** — Factory, Strategy, Observer, Builder\n- **Profiling** — JFR and VisualVM when speed matters\n- **Kotlin** — the same JVM with less ceremony' },
      { k: 'callout', tone: 'tip', md: 'The best next step is not another course but **a project of your own that you actually use**. A tool that solves a real problem for you teaches more than ten exercises — because a real problem has no answer key and does not stop where the curriculum does.' },
    ],
    quiz: [
      { k: 'single', q: 'What belongs to a finished Java project?', opts: ['Only the source', 'Source, tests, pom.xml, README, .gitignore, a runnable JAR', 'Only the JAR'], answer: 1, why: 'Without the README and the tests the project is unusable to anyone else.' },
      { k: 'single', q: 'How large should a method be?', opts: ['As large as needed', 'It should fit on a screen and do one thing', 'At most five lines'], answer: 1, why: 'If it does not fit, it usually contains two methods.' },
      { k: 'single', q: 'What replaces a comment?', opts: ['Brevity', 'A meaningful name', 'A test'], answer: 1, why: 'A good name says what the code does; a comment is for the why.' },
      { k: 'single', q: 'Why is "I will fix it later" expensive?', opts: ['It gets forgotten', 'Because five minutes today is half a day in three months', 'It causes bugs'], answer: 1, why: 'By then you have forgotten how it works and five places use it.' },
      { k: 'single', q: 'What is the best next step after learning?', opts: ['Another course', 'A project of your own that you actually use', 'More exercises'], answer: 1, why: 'A real problem has no answer key and does not stop where the curriculum does.' },
    ],
    note: {
      summary: ['A finished project: source, tests, pom.xml, README, .gitignore, JAR.', 'Quality: small methods, meaningful names, a narrow public surface.', 'A good name replaces a comment; comments are for the why.', '"I will fix it later" is the most expensive sentence.', 'Next: Spring Boot, JDBC/JPA, design patterns, profiling, Kotlin.', 'The best next step is a project of your own that you use.'],
      terms: [{ term: 'runnable JAR', def: 'A packaged Java application that starts on its own.' }, { term: 'public surface', def: 'The set of class members reachable from outside.' }, { term: 'technical debt', def: 'A deferred fix that costs more later.' }],
    },
  },
];
