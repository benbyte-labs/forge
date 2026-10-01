import type { Day } from '../../types';

/** JAVA track, days 11-17. */
export const javaEnC: Day[] = [
  {
    day: 11,
    title: 'Static members',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A `static` member belongs to the **class**, not to an instance. There is exactly one of it, no matter how many objects you create.' },
      { k: 'code', lang: 'java', src: 'public class Rover {\n    private static int count = 0;        // shared across all rovers\n    private final int serial;\n\n    public Rover() {\n        count++;\n        this.serial = count;             // different per instance\n    }\n\n    public static int getCount() {\n        return count;\n    }\n}', explain: '`count` exists once in the whole program. `serial` exists separately in every object. You call the static method on the class: `Rover.getCount()`.' },
      { k: 'callout', tone: 'key', md: 'A static method **cannot reach an instance field**, because there is no `this`. Referring to `serial` from a static method does not compile — it would not know which rover you meant.' },
      { k: 'text', md: 'What is `static` actually good for?\n\n- **Constants**: `public static final double G = 9.81;`\n- **Stateless helpers**: `Math.sqrt`, `Integer.parseInt`\n- **Factory methods**: `List.of(...)`, `Rover.newDefault()`' },
      { k: 'callout', tone: 'warn', md: '**Mutable static state** is dangerous: the whole program shares one variable, across threads too. A static constant is fine; a static `List` everyone writes into is not.' },
    ],
    quiz: [
      { k: 'single', q: 'What does a `static` field belong to?', opts: ['Each instance separately', 'The class: there is one of it', 'The method'], answer: 1, why: 'Exactly one copy exists in the program, regardless of how many objects you create.' },
      { k: 'single', q: 'Why can a static method not read an instance field?', opts: ['Because it is slow', 'Because there is no `this`: it does not know which object', 'Because Java forbids fields'], answer: 1, why: 'A static method is callable without an object, so there is no instance whose field it could read.' },
      { k: 'single', q: 'Which is a good use of `static`?', opts: ['A shared list everyone mutates', 'A constant, e.g. `public static final double G = 9.81;`', 'Making every field static'], answer: 1, why: 'A constant never changes, so sharing it is harmless. Shared mutable state is unpredictable.' },
      { k: 'single', q: 'How do you call a static method?', opts: ['On the class name: `Rover.getCount()`', 'Only through an instance', 'You cannot call it'], answer: 0, why: 'The class name is the natural call. Through an instance it compiles but is misleading, so the compiler warns.' },
    ],
    note: {
      summary: ['A `static` member belongs to the class; there is one of it.', 'Static methods have no `this`, so they cannot reach instance fields.', 'Good uses: constants, stateless helpers, factory methods.', 'Call on the class name: `Rover.getCount()`.', 'Avoid mutable static state, especially with threads.'],
      terms: [{ term: 'static', def: 'A class-level member, not tied to an instance.' }, { term: 'static final', def: 'A constant: class-level and unchangeable.' }, { term: 'factory method', def: 'A static method that returns a new instance.' }],
    },
  },
  {
    day: 12,
    title: 'Inheritance',
    minutes: 22,
    lesson: [
      { k: 'text', md: '**Inheritance** says: this class *is a kind of* that one. The subclass gets the fields and methods of its parent, and can add to them or override them.' },
      { k: 'code', lang: 'java', src: 'public class Vehicle {\n    protected int speed;\n\n    public void start() {\n        System.out.println("Motor running");\n    }\n}\n\npublic class Rover extends Vehicle {\n    private int wheels = 6;\n\n    @Override\n    public void start() {\n        super.start();                   // the parent behaviour\n        System.out.println("Six wheels ready");\n    }\n}', explain: '`extends` marks inheritance. `@Override` is optional but asks the compiler to check that the parent really has such a method. `super.start()` calls the original version.' },
      { k: 'callout', tone: 'key', md: 'In Java a class has **exactly one** parent. It can implement any number of interfaces though — that is the answer to the multiple inheritance problem.' },
      { k: 'callout', tone: 'warn', md: 'Only inherit when the sentence **"X is a kind of Y"** is true. `Rover is a kind of Vehicle` is fine. `Rover is a kind of Battery` is not — a rover *has* a battery, so that is a field, not inheritance. That is **composition**, and it is the better choice most of the time.' },
      { k: 'text', md: 'A `protected` field is visible to subclasses. Be careful: that promises the internal layout to every future subclass. Often a `private` field with a `protected` getter is better.' },
    ],
    quiz: [
      { k: 'single', q: 'What does `super.start()` do?', opts: ['Calls itself again', 'Calls the parent method of the same name', 'Deletes the method'], answer: 1, why: 'It lets you extend the parent behaviour rather than replacing it entirely.' },
      { k: 'single', q: 'How many parent classes can a Java class have?', opts: ['Any number', 'Exactly one', 'At most two'], answer: 1, why: 'One `extends`. Multiple interfaces are allowed and supply the missing flexibility.' },
      { k: 'single', q: 'When should you NOT use inheritance?', opts: ['When "X is a kind of Y" is not true', 'When there are many methods', 'When the project is large'], answer: 0, why: 'If the relationship is really "X has a Y", use a field (composition), not inheritance.' },
      { k: 'single', q: 'What is `@Override` for?', opts: ['It speeds up the method', 'It asks the compiler to verify that it really overrides something', 'It is mandatory on all methods'], answer: 1, why: 'With a misspelled method name you get a compile error instead of a new method nobody ever calls.' },
      { k: 'order', q: 'What happens when you call `new Rover()`?', items: ['The Rover constructor runs', 'The Vehicle constructor runs', 'Memory is allocated'], correct: [2, 1, 0], why: 'Memory first, then the parent constructor, then the subclass. The parent is always ready before the subclass starts work.' },
    ],
    note: {
      summary: ['Inheritance expresses "X is a kind of Y", with the `extends` keyword.', '`super.method()` calls the original parent version.', 'One parent class, but any number of interfaces.', 'If the relationship is "X has a Y", use composition instead.', '`@Override` checks the override at compile time.', 'Constructor order: parent first, subclass after.'],
      terms: [{ term: 'extends', def: 'The keyword that declares inheritance.' }, { term: 'super', def: 'A reference to parent class members.' }, { term: 'composition', def: 'Holding another object as a field instead of inheriting.' }],
    },
  },
  {
    day: 13,
    title: 'Abstract classes and interfaces',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Both exist to describe a **contract**: what a type can do, without saying how.' },
      { k: 'code', lang: 'java', src: 'public interface Movable {\n    void move(int cm);               // no body: everyone writes it\n\n    default void stop() {            // a default implementation\n        move(0);\n    }\n}\n\npublic abstract class Vehicle implements Movable {\n    protected int battery = 100;\n\n    public abstract int maxSpeed();      // must be written\n\n    public boolean operable() {          // finished behaviour\n        return battery > 5;\n    }\n}', explain: 'An interface is a contract (plus `default` methods). An abstract class can hold state and finished methods, but cannot be instantiated.' },
      { k: 'callout', tone: 'key', md: 'The decision is simple: **interface when you describe a capability**; **abstract class when you also supply shared state and finished code**. If in doubt, start with an interface — you can implement several.' },
      { k: 'text', md: 'A class can implement any number of interfaces:\n\n`public class Rover extends Vehicle implements Movable, Chargeable, Loggable { ... }`\n\nThis replaces multiple inheritance, because interfaces carry no conflicting state.' },
      { k: 'callout', tone: 'warn', md: 'Neither abstract classes nor interfaces can be **instantiated**: `new Vehicle()` does not compile. You can only create a subclass that implements every abstract method.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the main difference between an interface and an abstract class?', opts: ['An abstract class can hold state and finished methods; an interface is mainly a contract', 'Nothing', 'Interfaces are faster'], answer: 0, why: 'Abstract classes bring fields and implemented methods; interfaces describe capability, with `default` methods on top.' },
      { k: 'single', q: 'How many interfaces can one class implement?', opts: ['One', 'Any number', 'At most three'], answer: 1, why: 'This replaces multiple inheritance. Since interfaces hold no state, there is no conflict.' },
      { k: 'single', q: 'What does a `default` method in an interface do?', opts: ['Makes something mandatory', 'Supplies a default implementation that need not be overridden', 'Deletes the method'], answer: 1, why: 'It lets you add a method to an existing interface without breaking every implementing class.' },
      { k: 'single', q: 'What happens with `new Vehicle()` if Vehicle is abstract?', opts: ['It runs', 'Compile error', 'Returns null'], answer: 1, why: 'An abstract type cannot be instantiated, because it has at least one method with no body.' },
    ],
    note: {
      summary: ['Both describe a contract: what a type does, not how.', 'Interface: a capability with `default` methods; no state.', 'Abstract class: can hold fields and finished methods, cannot be instantiated.', 'One parent class, any number of interfaces.', 'If in doubt, start with an interface.'],
      terms: [{ term: 'interface', def: 'A type that describes only a contract, with no state.' }, { term: 'abstract class', def: 'A partly written class that cannot be instantiated.' }, { term: 'default method', def: 'A default implementation inside an interface.' }],
    },
  },
  {
    day: 14,
    title: 'Polymorphism in practice',
    minutes: 22,
    lesson: [
      { k: 'text', md: '**Polymorphism** means one reference can reach several different behaviours. At the call site you do not know, and do not care, which implementation runs.' },
      { k: 'code', lang: 'java', src: 'List<Movable> fleet = List.of(\n    new Rover(), new Drone(), new Arm()\n);\n\nfor (Movable m : fleet) {\n    m.move(10);           // each runs its own version\n}', explain: 'The loop sees `Movable`. At run time the Rover, Drone or Arm method is the one that executes — that is dynamic dispatch.' },
      { k: 'callout', tone: 'key', md: 'This is the biggest payoff of object orientation: **adding a new type does not require rewriting existing code**. The loop stays untouched when a `Boat` class arrives next year.' },
      { k: 'text', md: 'The rule: **always declare the most general type** that still lets you do the work.\n\n```\nList<String> names = new ArrayList<>();      // good\nArrayList<String> names = new ArrayList<>(); // needlessly narrow\n```\n\nThat way the implementation can be swapped later without touching anything else.' },
      { k: 'callout', tone: 'warn', md: 'A long `if` chain of `instanceof` checks usually means the behaviour belongs **in the types**. One method on the shared interface is shorter and extensible.' },
    ],
    quiz: [
      { k: 'single', q: 'What is dynamic dispatch?', opts: ['The compiler picks the method', 'At run time the actual object type decides which implementation runs', 'The order of methods'], answer: 1, why: 'The reference type decides what you may call; the actual object decides what runs.' },
      { k: 'single', q: 'What is the main benefit of polymorphism?', opts: ['Faster execution', 'Adding a new type does not require rewriting existing code', 'Less memory'], answer: 1, why: 'The calling side knows only the shared type, so it stays untouched when a new implementation arrives.' },
      { k: 'single', q: 'Which declaration is better?', opts: ['`ArrayList<String> names = new ArrayList<>();`', '`List<String> names = new ArrayList<>();`', 'Same'], answer: 1, why: 'Declare the most general sufficient type, so the implementation can be swapped later.' },
      { k: 'single', q: 'What does a long `instanceof` chain suggest?', opts: ['Good design', 'That the behaviour belongs in the types', 'A performance problem'], answer: 1, why: 'If every branch does something different per type, that is the job of one overridable method on the shared interface.' },
    ],
    note: {
      summary: ['Polymorphism: one reference, several behaviours.', 'Dynamic dispatch: the actual run-time type decides.', 'Main benefit: new types need no rewrite of existing code.', 'Always declare the most general sufficient type.', 'A long `instanceof` chain signals behaviour that belongs in the types.'],
      terms: [{ term: 'polymorphism', def: 'Reaching several implementations through one interface.' }, { term: 'dynamic dispatch', def: 'The run-time type decides which method runs.' }, { term: 'instanceof', def: 'A type-check operator; heavy use is a design smell.' }],
    },
  },
  {
    day: 15,
    title: 'Exception handling',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'An exception is an error the code **cannot resolve locally**, so it hands it to the caller. It is not a substitute for a return value: it signals a broken state, not a possible result.' },
      { k: 'code', lang: 'java', src: 'try (BufferedReader r = Files.newBufferedReader(path)) {\n    return Integer.parseInt(r.readLine());\n} catch (NumberFormatException e) {\n    return 0;                       // a sensible fallback\n} catch (IOException e) {\n    throw new IllegalStateException("Cannot read: " + path, e);\n}', explain: 'try-with-resources closes the reader by itself, errors included. The second `catch` does not swallow the error: it rewraps it and keeps the original as the cause.' },
      { k: 'callout', tone: 'key', md: 'Two kinds: a **checked** exception (e.g. `IOException`) is enforced by the compiler — either catch it or declare it with `throws`. An **unchecked** exception (a `RuntimeException` subclass) is not enforced; it signals a programming error.' },
      { k: 'callout', tone: 'warn', md: 'An **empty `catch` block** is the most expensive mistake in Java. The program continues in a broken state and fails a hundred lines later in an unrelated place. If you really want to swallow something, write one line saying why.' },
      { k: 'text', md: '`finally` always runs, errors included. For closing resources, **try-with-resources** is better: shorter, and impossible to forget. Anything `AutoCloseable` works in it.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the difference between checked and unchecked exceptions?', opts: ['Checked ones are enforced by the compiler, unchecked ones are not', 'Checked ones are faster', 'No difference'], answer: 0, why: 'A checked exception must be caught or declared with `throws`. Unchecked ones typically signal a programming error.' },
      { k: 'single', q: 'Why is an empty `catch` block bad?', opts: ['It is slow', 'The program continues broken and fails somewhere else', 'It does not compile'], answer: 1, why: 'The signal disappears while the cause remains. Debugging time multiplies.' },
      { k: 'single', q: 'What is the advantage of try-with-resources?', opts: ['It closes the resource automatically, errors included', 'Faster I/O', 'It swallows exceptions'], answer: 0, why: 'Every `AutoCloseable` is closed at the end of the block, even when an exception flies.' },
      { k: 'single', q: 'What should you do when rewrapping an exception?', opts: ['Discard the original', 'Pass it to the constructor as the cause', 'Print it and continue'], answer: 1, why: '`new IllegalStateException(msg, e)` preserves the original stack trace. Without it you lose where the trouble began.' },
      { k: 'order', q: 'In what order does code run when an error occurs?', items: ['the finally block', 'the try block up to the error', 'the matching catch block'], correct: [1, 2, 0], why: 'try runs up to the failure, then the matching catch, and finally always runs last.' },
    ],
    note: {
      summary: ['An exception is an error the code cannot resolve locally.', 'Checked: enforced by the compiler. Unchecked: signals a programming error.', 'An empty `catch` is the costliest mistake: it hides the signal, keeps the cause.', 'When rewrapping, pass the original as the cause.', 'try-with-resources closes any `AutoCloseable` automatically.', '`finally` always runs.'],
      terms: [{ term: 'checked exception', def: 'An exception the compiler forces you to handle or declare.' }, { term: 'try-with-resources', def: 'A construct that closes resources automatically.' }, { term: 'cause', def: 'The original exception preserved inside a rewrapped one.' }],
    },
  },
  {
    day: 16,
    title: 'Custom exceptions',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Write a custom exception when the caller wants to **react differently** to this error than to any other. If everyone would handle it the same way, a standard exception is enough.' },
      { k: 'code', lang: 'java', src: 'public class BatteryEmptyException extends RuntimeException {\n    private final int level;\n\n    public BatteryEmptyException(int level) {\n        super("Battery at " + level + "% — movement needs at least 5%");\n        this.level = level;\n    }\n\n    public int getLevel() {\n        return level;\n    }\n}', explain: 'The exception **carries data**: the caller can read the level and decide whether to charge or stop. That is what makes a custom type worth it.' },
      { k: 'callout', tone: 'key', md: 'The choice: subclass `RuntimeException` for a **programming error or avoidable situation** (so it need not be caught everywhere), and `Exception` when you **expect the caller to handle it** (network, files).' },
      { k: 'text', md: 'A good exception message says three things: **what happened**, **with what value**, and **what was required**. "An error occurred" is worth nothing during debugging.' },
      { k: 'callout', tone: 'tip', md: 'Most applications need **two or three** custom exceptions. If you have twenty, most of them are never caught separately — fold those into one type with an enum field.' },
    ],
    quiz: [
      { k: 'single', q: 'When is a custom exception worth writing?', opts: ['For every error', 'When the caller wants to react differently to this error than to others', 'Never'], answer: 1, why: 'A custom type only helps if it justifies a separate `catch`. Otherwise a standard exception suffices.' },
      { k: 'single', q: 'What is the benefit of an exception carrying data?', opts: ['Prettier code', 'The caller can read it and make a decision', 'It is faster'], answer: 1, why: 'With `getLevel()` the caller can decide to charge or stop. A message cannot be read programmatically.' },
      { k: 'single', q: 'When should you subclass `RuntimeException`?', opts: ['For a programming error or avoidable situation', 'Always', 'Never'], answer: 0, why: 'Then it need not be caught everywhere. If you expect the caller to handle it, `Exception` is the right parent.' },
      { k: 'single', q: 'What should a good exception message contain?', opts: ['That an error occurred', 'What happened, with what value, and what was required', 'The method name'], answer: 1, why: 'The concrete value is worth the most while debugging. "An error occurred" helps nobody.' },
    ],
    note: {
      summary: ['A custom exception is worth it when it justifies a separate `catch`.', 'An exception can carry data the caller reads and decides on.', '`RuntimeException` subclass: programming error, not caught everywhere.', '`Exception` subclass: handling expected from the caller.', 'A good message: what happened, with what value, what was required.'],
      terms: [{ term: 'RuntimeException', def: 'The common parent of unchecked exceptions.' }, { term: 'exception message', def: 'The description of the failure, including the concrete value.' }, { term: 'exception type', def: 'A custom class marking an error worth distinguishing.' }],
    },
  },
  {
    day: 17,
    title: 'Collections: List and Map',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'An array has a fixed size. The **Collections** framework gives you growable, searchable containers — the everyday tooling of Java.' },
      { k: 'code', lang: 'java', src: 'List<String> names = new ArrayList<>();\nnames.add("Rover-1");\nnames.add("Rover-2");\nSystem.out.println(names.size());        // 2\nSystem.out.println(names.contains("Rover-1"));  // true\n\nMap<String, Integer> batteries = new HashMap<>();\nbatteries.put("Rover-1", 87);\nint level = batteries.getOrDefault("Rover-9", 0);   // 0, not null', explain: '`List` keeps order; `Map` holds key-value pairs. `getOrDefault` saves you a null check.' },
      { k: 'callout', tone: 'key', md: 'The practical choice:\n\n- **ArrayList** — the default list; fast indexing\n- **HashMap** — the default dictionary; fast key lookup\n- **HashSet** — a set; no duplicates, fast membership test\n- **LinkedList** — rarely needed; only if you insert at the front a lot' },
      { k: 'text', md: 'Lookup speed is the point. `List.contains` walks the whole list. `HashMap.get` and `HashSet.contains` go straight there. At ten thousand elements the difference is already noticeable.' },
      { k: 'callout', tone: 'warn', md: 'If you put your own class into a `HashMap` as a key or into a `HashSet`, **write both `equals` and `hashCode`**, always as a pair. Without them two equal-looking objects become two separate entries and lookups mysteriously find nothing.' },
      { k: 'callout', tone: 'tip', md: 'For fixed content use the `List.of(...)` and `Map.of(...)` factories: shorter, and immutable, so the contents cannot be corrupted by accident.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the difference between a List and a Map?', opts: ['A List keeps order, a Map stores key-value pairs', 'Nothing', 'A Map is faster at everything'], answer: 0, why: 'You take elements from a list by index, and from a map by key.' },
      { k: 'single', q: 'Which is faster for a membership test at ten thousand elements?', opts: ['ArrayList.contains', 'HashSet.contains', 'The same'], answer: 1, why: 'A HashSet hashes straight to the answer. An ArrayList walks the whole list.' },
      { k: 'single', q: 'What must you write when using your own class as a HashMap key?', opts: ['Only toString', 'Both equals and hashCode, as a pair', 'Nothing'], answer: 1, why: 'HashMap finds the bucket by hashCode and the exact match by equals. One without the other misbehaves.' },
      { k: 'single', q: 'What does `getOrDefault("Rover-9", 0)` return for a missing key?', opts: ['null', '0', 'It throws'], answer: 1, why: 'It returns the fallback you supplied, which removes the null check.' },
      { k: 'single', q: 'What is the advantage of `List.of(...)`?', opts: ['Faster execution', 'Short and immutable, so it cannot be corrupted accidentally', 'It holds more elements'], answer: 1, why: 'An immutable collection can be handed around safely without the caller writing into it.' },
    ],
    note: {
      summary: ['The Collections framework replaces fixed-size arrays with growable containers.', 'ArrayList: the default list. HashMap: the default map. HashSet: a set.', 'HashMap and HashSet look up directly; List.contains walks the list.', 'A custom key class needs equals and hashCode, always paired.', '`getOrDefault` removes the null check.', '`List.of(...)` is short and immutable.'],
      terms: [{ term: 'ArrayList', def: 'An array-backed growable list.' }, { term: 'HashMap', def: 'A key-value store based on hashing.' }, { term: 'hashCode', def: 'The number hashed containers use to group entries.' }],
    },
  },
];
