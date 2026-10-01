import type { Day } from '../../types';

/** JAVA track, days 4–10. */
export const javaEnB: Day[] = [
  {
    day: 4,
    title: 'Methods and parameters',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A method is like a Python function, only with **types**: you declare what it takes and what it gives back. The compiler enforces it.' },
      { k: 'code', lang: 'java', src: 'public static int add(int a, int b) {\n    return a + b;\n}\n\npublic static void greet(String name) {\n    System.out.println("Hello, " + name);\n}', explain: 'The first word is the return type. `void` means it gives nothing back. `static` means, for now, that it can be called without an instance.' },
      { k: 'callout', tone: 'key', md: 'Java lets the same name exist with **several parameter lists** — that is overloading. `add(int, int)` and `add(double, double)` live together happily; the compiler picks by the arguments.' },
      { k: 'code', lang: 'java', src: 'public static double average(int[] numbers) {\n    if (numbers.length == 0) return 0;\n    int total = 0;\n    for (int n : numbers) total += n;\n    return (double) total / numbers.length;\n}', explain: 'Without the `(double)` cast this would be integer division and the fraction would vanish. One of the quietest bugs in Java.' },
      { k: 'callout', tone: 'warn', md: 'A method **cannot** change a primitive variable of its caller: it receives a copy. With an object it receives a copy of the reference, so it can indeed change the object that reference points to.' },
    ],
    quiz: [
      { k: 'single', q: 'What does a `void` return type mean?', opts: ['It returns zero', 'It returns nothing', 'It signals an error'], answer: 1, why: 'A `void` method just does something — prints, for example — but has no value you could store.' },
      { k: 'single', q: 'What is method overloading?', opts: ['Too many parameters', 'The same name with several different parameter lists', 'A bug'], answer: 1, why: 'The compiler picks by the number and types of arguments. The return type alone is not enough to tell them apart.' },
      { k: 'output', q: 'What does this print?', code: 'int a = 7, b = 2;\nSystem.out.println((double) a / b);', lang: 'java', opts: ['3', '3.5', '3.0'], answer: 1, why: 'The cast makes `a` a double, so the division is decimal: 3.5.' },
      { k: 'single', q: 'Can a method change the caller\'s `int` variable?', opts: ['Yes', 'No, it receives a copy', 'Only if static'], answer: 1, why: 'Primitives are passed by value. The method changes its own copy; the caller\'s stays as it was.' },
    ],
    note: {
      summary: ['The return type comes first in a method header; `void` returns nothing.', 'Parameters have types and the compiler checks them.', 'Overloading: the same name with different parameter lists.', 'Integer division needs a `(double)` cast to keep the fraction.', 'A primitive arrives as a copy; the caller\'s variable cannot be changed.'],
      terms: [{ term: 'return type', def: 'The type a method gives back; `void` if nothing.' }, { term: 'overloading', def: 'Methods of the same name with different parameter lists.' }, { term: 'cast', def: 'Converting a value to another type, such as `(double) a`.' }],
    },
  },
  {
    day: 5,
    title: 'Branching and loops',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Control structures are nearly the same as in Python — the difference is the **braces** and the compulsory semicolon. Indentation carries no meaning here, only readability.' },
      { k: 'code', lang: 'java', src: 'if (battery > 70) {\n    System.out.println("Full speed");\n} else if (battery > 20) {\n    System.out.println("Economy");\n} else {\n    System.out.println("Needs charging");\n}', explain: 'The condition sits in **parentheses** and the block in braces. Braces are optional for a single line — but do not skip them; that is where quiet bugs come from.' },
      { k: 'code', lang: 'java', src: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n\nint n = 5;\nwhile (n > 0) {\n    n--;\n}\n\nint[] distances = {12, 8, 30};\nfor (int d : distances) {\n    System.out.println(d);\n}', explain: 'The classic `for` has three parts: start, condition, step. The for-each form is right when you do not need the index.' },
      { k: 'callout', tone: 'warn', md: 'In its traditional form `switch` **falls through** to the next branch without a `break`. That is one of the oldest traps in the language. Newer Java has the `case X -> ...` arrow form, which does not fall through — use that.' },
    ],
    quiz: [
      { k: 'single', q: 'What defines a block in Java?', opts: ['Indentation', 'Braces', 'The semicolon'], answer: 1, why: 'In Java indentation is only readability. The block is marked by `{ }` — which is why misindented code can still be correct.' },
      { k: 'output', q: 'How many times does the body run?', code: 'for (int i = 0; i < 3; i++) {\n    System.out.println(i);\n}', lang: 'java', opts: ['2', '3', '4'], answer: 1, why: 'i = 0, 1, 2 — three times. The condition is `i < 3`, so it never reaches 3.' },
      { k: 'single', q: 'What happens in an old-style `switch` without a `break`?', opts: ['An error', 'It falls through into the next branch', 'Nothing'], answer: 1, why: 'That is fall-through. Occasionally useful, but the cause of most switch bugs. The arrow form (`case X ->`) does not fall through.' },
      { k: 'single', q: 'When should you use the for-each form?', opts: ['Always', 'When you do not need the index', 'Only with arrays'], answer: 1, why: 'It reads better and cannot get the bounds wrong. When the index is needed, the classic form is right.' },
    ],
    note: {
      summary: ['The condition goes in parentheses and the block in braces.', 'Indentation has no meaning in Java, only readability value.', 'The classic `for`: start, condition, step.', 'for-each (`for (int d : array)`) walks without an index.', 'Old-style `switch` falls through without `break`; the arrow form does not.'],
      terms: [{ term: 'block', def: 'A sequence of statements enclosed in braces.' }, { term: 'for-each', def: 'An index-free loop form for walking collections.' }, { term: 'fall-through', def: 'A switch continuing into the next branch for want of a break.' }],
    },
  },
  {
    day: 6,
    title: 'Arrays',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'An array is a **fixed-size** sequence of items of one type. It is the simplest collection in Java, and the most rigid.' },
      { k: 'code', lang: 'java', src: 'int[] distances = new int[5];       // five zeros\nint[] readings = {12, 8, 30, 5};    // filled straight away\n\nSystem.out.println(readings.length);   // 4 — not length()!\nreadings[0] = 99;', explain: '`length` is a **field**, not a method — hence no parentheses. On a String it is the `length()` method. That inconsistency catches everyone once.' },
      { k: 'callout', tone: 'warn', md: 'An array cannot be resized after creation. To grow it you must make a new one and copy — or better, use an `ArrayList`, which comes on day 17.' },
      { k: 'code', lang: 'java', src: 'int[][] grid = new int[3][4];    // 3 rows, 4 columns\ngrid[1][2] = 7;\n\nfor (int[] row : grid) {\n    for (int value : row) {\n        System.out.print(value + " ");\n    }\n    System.out.println();\n}' },
      { k: 'callout', tone: 'key', md: 'An invalid index gives an `ArrayIndexOutOfBoundsException` — **at runtime**, not at compile time. Java does not protect you here: bounds checking is your job.' },
    ],
    quiz: [
      { k: 'single', q: 'How do you ask for the length of an array?', opts: ['array.length()', 'array.length', 'array.size()'], answer: 1, why: 'On an array `length` is a field, without parentheses. `length()` is the String method and `size()` belongs to collections.' },
      { k: 'single', q: 'Can an array be resized after creation?', opts: ['Yes', 'No, you must make a new one', 'Only if empty'], answer: 1, why: 'An array has a fixed size. Growing means a new array and a copy — or rather an ArrayList.' },
      { k: 'single', q: 'What happens on an invalid index?', opts: ['A compile error', 'An ArrayIndexOutOfBoundsException at runtime', 'It returns zero'], answer: 1, why: 'The compiler cannot know the index in advance, so it only shows at runtime. Bounds checking is the programmer\'s responsibility.' },
      { k: 'output', q: 'What does this print?', code: 'int[] a = {1, 2, 3};\nSystem.out.println(a.length);', lang: 'java', opts: ['2', '3', '4'], answer: 1, why: 'There are three items, so the length is 3. The highest valid index, however, is 2.' },
    ],
    note: {
      summary: ['An array is a fixed-size sequence of items of one type.', 'Create with `new int[5]` or `{12, 8, 30}`.', 'Length is the `length` **field**, no parentheses — on a String it is `length()`.', 'An array cannot be resized after creation.', 'An invalid index gives a runtime `ArrayIndexOutOfBoundsException`.'],
      terms: [{ term: 'array', def: 'A fixed-size sequence of items of one type.' }, { term: 'length', def: 'The field giving an array\'s size, without parentheses.' }, { term: 'two-dimensional array', def: 'An array of arrays, such as `int[3][4]`.' }],
    },
  },
  {
    day: 7,
    title: 'Working with strings',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'In Java a `String` is an **object and immutable**. Every operation makes a new instance — surprising until you get used to it, and it has performance consequences too.' },
      { k: 'code', lang: 'java', src: 'String s = "Rover";\ns.toUpperCase();              // changes nothing!\ns = s.toUpperCase();          // now it does\n\nSystem.out.println(s.length());\nSystem.out.println(s.substring(0, 3));   // ROV\nSystem.out.println(s.contains("OV"));    // true' },
      { k: 'callout', tone: 'warn', md: '**Never** compare two strings with `==`. It tests identity, not content, and it sometimes returns true by accident (the compiler pools identical literals) — which makes the bug intermittent. Always `equals()`.' },
      { k: 'code', lang: 'java', src: 'String a = "apple";\nString b = new String("apple");\n\nSystem.out.println(a == b);        // false\nSystem.out.println(a.equals(b));   // true' },
      { k: 'callout', tone: 'key', md: 'Do not join strings with `+` inside a loop: each step makes a new object, and at a thousand iterations that is noticeably slow. Use a `StringBuilder`.' },
    ],
    quiz: [
      { k: 'single', q: 'How do you compare two strings?', opts: ['==', 'equals()', 'compare()'], answer: 1, why: '`==` tests identity. Content is compared with `equals()` — the most common Java trap there is.' },
      { k: 'output', q: 'What does this print?', code: 'String s = "abc";\ns.toUpperCase();\nSystem.out.println(s);', lang: 'java', opts: ['ABC', 'abc', 'It raises'], answer: 1, why: 'A String is immutable: the method returns a new instance, which nobody kept here.' },
      { k: 'single', q: 'Why is `+` joining bad inside a loop?', opts: ['It will not compile', 'Each step makes a new object, so it is slow', 'It gives the wrong result'], answer: 1, why: 'Strings are immutable, so every join builds a new instance. A thousand iterations is a thousand wasted objects.' },
      { k: 'single', q: 'Why does `==` sometimes return true for equal strings?', opts: ['Because it sometimes works', 'Because the compiler pools identical literals', 'By chance'], answer: 1, why: 'Identical string literals can point at the same instance. That is what makes the bug intermittent — and especially nasty.' },
    ],
    note: {
      summary: ['A String is an object and immutable; every method returns a new instance.', 'Always compare strings with `equals()`, never with `==`.', '`==` sometimes returns true by accident because literals are pooled.', 'Useful methods: `length()`, `substring()`, `contains()`, `split()`.', 'Join with a `StringBuilder` inside a loop, not with `+`.'],
      terms: [{ term: 'immutable', def: 'An object whose state cannot change after creation.' }, { term: 'equals()', def: 'Content comparison for objects.' }, { term: 'StringBuilder', def: 'A mutable text builder for joining inside loops.' }],
    },
  },
  {
    day: 8,
    title: 'Constructors',
    minutes: 20,
    lesson: [
      { k: 'text', md: "The constructor's job is to make sure an object is born in a **usable state**. If it manages that, every other method can safely assume all is well." },
      { k: 'code', lang: 'java', src: 'public class Rover {\n    private final String name;\n    private int battery;\n\n    public Rover(String name) {\n        this(name, 100);          // calls the other constructor\n    }\n\n    public Rover(String name, int battery) {\n        if (name == null || name.isBlank())\n            throw new IllegalArgumentException("A name is required");\n        this.name = name;\n        this.battery = Math.max(0, Math.min(100, battery));\n    }\n}', explain: '`this(...)` calls another constructor, so the validation lives in one place. A `final` field can only be set in the constructor.' },
      { k: 'callout', tone: 'key', md: 'If a constructor **throws**, the object is never created. That is good: better to fail loudly at birth than to work with a half-built object that collapses a hundred lines later.' },
      { k: 'callout', tone: 'warn', md: 'Write **no** constructor and Java gives you an empty one. Write one and the default disappears — and `new Rover()` no longer compiles.' },
    ],
    quiz: [
      { k: 'single', q: 'What does a `this(...)` call do in a constructor?', opts: ['Returns the object', 'Calls another constructor of the same class', 'Destroys the object'], answer: 1, why: 'It keeps shared validation in one place and lets a short constructor delegate to a fuller one.' },
      { k: 'single', q: 'What happens if a constructor throws?', opts: ['A half-built object exists', 'The object is never created', 'The program stops'], answer: 1, why: '`new` hands back no reference. Better to fail at birth than to continue with an invalid state.' },
      { k: 'single', q: 'What happens to the default constructor once you write your own?', opts: ['It stays', 'It disappears', 'It errors'], answer: 1, why: 'The compiler only supplies an empty constructor when you wrote none. If you need it, write it yourself.' },
      { k: 'single', q: 'When can a `final` field be assigned?', opts: ['Any time', 'At the declaration or in the constructor, once', 'Never'], answer: 1, why: 'A `final` field is set exactly once and is constant thereafter. It signals that this does not change over the object\'s life.' },
    ],
    note: {
      summary: ["A constructor's job is to make sure the object is born usable.", '`this(...)` calls another constructor, keeping validation in one place.', 'A throwing constructor means the object is never created — correct behaviour.', 'Writing your own constructor removes the default empty one.', 'A `final` field is assigned once, at the declaration or in the constructor.'],
      terms: [{ term: 'constructor chaining', def: 'One constructor calling another with `this(...)`.' }, { term: 'IllegalArgumentException', def: 'The standard exception for an invalid argument.' }, { term: 'final field', def: 'A write-once field that cannot change afterwards.' }],
    },
  },
  {
    day: 9,
    title: 'Visibility: public and private',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A visibility modifier says **from where** a member can be reached. It is not a security question but a design one: it marks what is a public promise and what is internal business.' },
      { k: 'text', md: '- `public` — from anywhere\n- `protected` — from the same package and from subclasses\n- *(nothing)* — from the same package only (package-private)\n- `private` — from the same class only' },
      { k: 'callout', tone: 'key', md: 'A good default: **everything `private`**, and only what is genuinely needed from outside becomes `public`. What you make public is hard to take back later — others are already using it.' },
      { k: 'code', lang: 'java', src: 'public class Battery {\n    private int level = 100;          // internal business\n\n    public int getLevel() {           // the public promise\n        return level;\n    }\n\n    public void drain(int amount) {\n        level = Math.max(0, level - amount);\n    }\n}', explain: 'The level is read-only from outside and can only fall through `drain`, so it can never go negative or above 100.' },
      { k: 'callout', tone: 'tip', md: 'If a field has both a getter and a setter with no validation at all, ask what making it private achieved. Encapsulation is not a ritual; it is about the class guaranteeing something.' },
    ],
    quiz: [
      { k: 'single', q: 'From where can a `private` member be reached?', opts: ['Anywhere', 'From the same class only', 'From subclasses only'], answer: 1, why: '`private` is the narrowest: not even the same package can see it, only code inside the class.' },
      { k: 'single', q: 'What is a good default when designing?', opts: ['Everything public', 'Everything private, and only what is needed public', 'Everything protected'], answer: 1, why: 'The public surface is a promise that is hard to withdraw. Fewer public members, fewer commitments.' },
      { k: 'single', q: 'What does no modifier before a member mean?', opts: ['The same as public', 'Package-private: visible only within the same package', 'An error'], answer: 1, why: 'That is the default, package-private visibility. It often appears by accident when someone forgets the modifier.' },
      { k: 'single', q: 'What is wrong with an unvalidated getter-setter pair?', opts: ['It is slow', 'It gives the same as a public field, only more laboriously', 'It will not compile'], answer: 1, why: 'If anyone can set anything, the class guarantees nothing. Encapsulation only means something when there is something to defend.' },
    ],
    note: {
      summary: ['Visibility: public, protected, package-private (no modifier), private.', '`private` is visible only inside the class.', 'Good default: everything private, only what is needed public.', 'The public surface is a promise that is hard to withdraw later.', 'An unvalidated getter-setter pair encapsulates nothing.'],
      terms: [{ term: 'visibility', def: 'What controls where a class member can be reached from.' }, { term: 'package-private', def: 'Default visibility with no modifier: same package only.' }, { term: 'public surface', def: 'The set of members a class exposes to the outside.' }],
    },
  },
  {
    day: 10,
    title: 'Getters, setters, encapsulation',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'Encapsulation is not about manufacturing a getter and setter for every field. It is about the class **guaranteeing** something that cannot be broken from outside.' },
      { k: 'code', lang: 'java', src: 'public class Temperature {\n    private double celsius;\n\n    public double getCelsius() { return celsius; }\n\n    public void setCelsius(double c) {\n        if (c < -273.15)\n            throw new IllegalArgumentException("Nothing is colder than absolute zero");\n        this.celsius = c;\n    }\n\n    public double getFahrenheit() {       // derived, no field behind it\n        return celsius * 9 / 5 + 32;\n    }\n}', explain: 'There is no field behind `getFahrenheit`: it computes. The caller does not know — and does not need to. That is the value of encapsulation.' },
      { k: 'callout', tone: 'key', md: 'A getter need not return a field and a setter need not merely assign. That is what lets you change the internals later without breaking anybody\'s code.' },
      { k: 'callout', tone: 'warn', md: 'If a getter returns a list, the caller can **modify** it — and with it your internal state. Return a copy or an unmodifiable view: `List.copyOf(list)`.' },
    ],
    quiz: [
      { k: 'single', q: 'Does every field need a getter and a setter?', opts: ['Yes, always', 'No — only what is genuinely needed from outside', 'Only a getter'], answer: 1, why: 'Needless access is a needless commitment. Every public member is a promise you have to keep.' },
      { k: 'single', q: 'What is notable about `getFahrenheit` in the example?', opts: ['There is a field behind it', 'It computes the value; there is no field behind it', 'It throws'], answer: 1, why: 'The caller uses it like any other getter, but the value comes from a calculation. The internal structure stays hidden.' },
      { k: 'single', q: 'What is wrong with a getter that returns the internal list?', opts: ['It is slow', 'The caller can change your internal state with it', 'It will not compile'], answer: 1, why: 'You handed over the reference, not a copy. The caller can add or remove, bypassing all your checks.' },
      { k: 'single', q: 'What is the real benefit of encapsulation?', opts: ['Less typing', 'You can change the internals without breaking callers', 'Faster execution'], answer: 1, why: 'As long as the public surface stays the same, the inside is yours to rewrite. That is what makes a large system maintainable.' },
    ],
    note: {
      summary: ['Encapsulation is about the guarantee, not the getter-setter ritual.', 'A setter may validate and throw on an invalid value.', 'A getter may compute: there need not be a field behind it.', 'A getter returning a list should give a copy or an unmodifiable view.', 'While the public surface holds, the internals can be rewritten freely.'],
      terms: [{ term: 'getter', def: 'A reading method that need not return a field.' }, { term: 'setter', def: 'A writing method that may validate before assigning.' }, { term: 'defensive copy', def: 'Returning a copy so the caller cannot change internal state.' }],
    },
  },
];
