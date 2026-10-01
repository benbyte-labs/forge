import type { Day } from '../../types';

/** C++ track, days 4–10. */
export const cppEnB: Day[] = [
  {
    day: 4,
    title: 'Passing by reference and by value',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Alongside C pointers, C++ brings a more comfortable tool: the **reference**. It does the same job, cannot be null, and needs no stars.' },
      { k: 'code', lang: 'cpp', src: 'void incPointer(int *x) { (*x)++; }\nvoid incRef(int &x)     { x++; }\n\nint n = 5;\nincPointer(&n);   // 6\nincRef(n);        // 7 — no & at the call site', explain: 'A reference is another name for the variable. The call site does not show that it will be modified — which is why a descriptive function name matters.' },
      { k: 'callout', tone: 'key', md: 'There are three choices and each has its place:\n\n- **by value** (`int x`) — small data you do not modify\n- **const reference** (`const std::string &s`) — large data you do not modify\n- **reference** (`int &x`) — you intend to modify it' },
      { k: 'code', lang: 'cpp', src: 'void print(const std::vector<int> &v) {   // no copy, no modification\n    for (int x : v) std::cout << x << " ";\n}' },
      { k: 'callout', tone: 'warn', md: 'Never pass a large object by value. Copying a ten-thousand-item `vector` on every call is wasted work — `const &` gives the same thing for free.' },
    ],
    quiz: [
      { k: 'single', q: 'What is a reference?', opts: ['Another name for a pointer', 'Another name for a variable', 'A copy'], answer: 1, why: 'A reference is an alias: it refers to the same storage. It cannot be null and needs no dereferencing.' },
      { k: 'single', q: 'When should you pass as `const &`?', opts: ['Always', 'For large data you do not modify', 'Never'], answer: 1, why: 'You avoid the copy, and `const` guarantees the caller\'s data stays untouched.' },
      { k: 'output', q: 'What does this print?', code: 'void f(int &x) { x = 10; }\nint a = 5;\nf(a);\nstd::cout << a;', lang: 'cpp', opts: ['5', '10', '0'], answer: 1, why: 'The reference refers to `a` itself, so the function rewrites it.' },
      { k: 'single', q: 'What is the downside of a reference compared with a pointer?', opts: ['It is slower', 'The call site does not show that it will be modified', 'It cannot be passed to a function'], answer: 1, why: 'From `f(a)` you cannot tell that `a` changes. With a pointer, `&a` at least warns you.' },
    ],
    note: {
      summary: ['A reference is another name for a variable: never null, no dereferencing.', 'Pass small, unmodified data by value.', '`const &` for large data you do not modify: no copy.', 'A plain `&` when you intend to modify the caller\'s variable.', 'Never pass a large object by value.'],
      terms: [{ term: 'reference', def: 'Another name for an existing variable, which cannot be null.' }, { term: 'const reference', def: 'Passing without a copy, with a guarantee of no modification.' }, { term: 'pass by value', def: 'The function receives a copy of the parameter.' }],
    },
  },
  {
    day: 5,
    title: 'Constructors and destructors',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'Yesterday you met RAII. Today we look at exactly **when** a constructor and a destructor run — because everything depends on it.' },
      { k: 'code', lang: 'cpp', src: 'class Log {\npublic:\n    Log(const std::string &name) : name_(name) {\n        std::cout << name_ << " opened\\n";\n    }\n    ~Log() {\n        std::cout << name_ << " closed\\n";\n    }\nprivate:\n    std::string name_;\n};\n\nint main() {\n    Log a("A");\n    {\n        Log b("B");\n    }                  // B closes here\n    std::cout << "end\\n";\n}                      // A closes here', explain: 'The order is: A opened, B opened, B closed, end, A closed. Destructors run in **reverse** order.' },
      { k: 'callout', tone: 'key', md: 'A destructor also runs when you leave a function because of an **exception**. That is why a file cannot be left unclosed or a lock unreleased — the greatest value of RAII.' },
      { k: 'text', md: 'The **initialiser list** (`: name_(name)`) is not a style choice: the fields get their value directly there. In the constructor body it would already be an assignment, an extra step — and for `const` or reference members it would not work at all.' },
      { k: 'callout', tone: 'warn', md: 'Fields are initialised **in declaration order**, not in the order of the initialiser list. If the two differ the compiler warns — pay attention to it.' },
    ],
    quiz: [
      { k: 'single', q: 'In what order do destructors run?', opts: ['Creation order', 'Reverse order', 'At random'], answer: 1, why: 'What was created last is destroyed first. That way dependencies are still alive when they are needed.' },
      { k: 'single', q: 'Does a destructor run when an exception is thrown?', opts: ['No', 'Yes, during stack unwinding', 'Only if you catch it'], answer: 1, why: 'As the exception propagates, every object leaving scope has its destructor run. That is why no resource leaks.' },
      { k: 'single', q: 'Why is an initialiser list better than assigning in the body?', opts: ['It looks nicer', 'The field is initialised directly rather than default-built then overwritten', 'It compiles faster'], answer: 1, why: 'In the body the field already exists and you overwrite it. For a `const` or reference member that would not even be possible.' },
      { k: 'single', q: 'In what order are fields initialised?', opts: ['The order of the initialiser list', 'Declaration order', 'Alphabetically'], answer: 1, why: 'Declaration order always decides. If the list suggests otherwise the compiler warns — and that prevents real bugs.' },
    ],
    note: {
      summary: ['The constructor runs at creation, the destructor at the end of scope.', 'Destructors run in reverse order.', 'They run on exceptions too — the greatest value of RAII.', 'The initialiser list gives fields their value directly.', 'Fields initialise in declaration order, not list order.'],
      terms: [{ term: 'initialiser list', def: 'Field initial values given in the constructor header.' }, { term: 'stack unwinding', def: 'Tearing down scopes as an exception propagates, running destructors.' }, { term: 'lifetime', def: 'The period during which an object exists.' }],
    },
  },
  {
    day: 6,
    title: 'Copy and move semantics',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'When you pass or return an object, C++ either **copies** or **moves** it. For a large vector the difference is between a second and a millisecond.' },
      { k: 'code', lang: 'cpp', src: 'std::vector<int> a = {1, 2, 3};\nstd::vector<int> b = a;              // COPY — two separate vectors\nstd::vector<int> c = std::move(a);   // MOVE — c takes over its contents\n\n// a is now empty but in a valid state', explain: 'A move does not copy: it takes over the internal pointer and leaves the old one empty. That is why it is cheap, and why a moved-from object must not be used further.' },
      { k: 'callout', tone: 'key', md: 'A returned value **moves automatically**. Feel free to return a large vector from a function — the compiler will not copy it. This is one of the biggest differences between modern and old C++.' },
      { k: 'code', lang: 'cpp', src: 'std::vector<int> build() {\n    std::vector<int> v(1000000);\n    return v;            // not a copy: a move, or built in place\n}', explain: 'People used to return pointers to avoid the copy. Today there is no need.' },
      { k: 'callout', tone: 'warn', md: '`std::move` **moves nothing** — it only marks the object as movable. The actual move is done by the move constructor. And a moved-from object is valid but unspecified: do not read it.' },
    ],
    quiz: [
      { k: 'single', q: 'What is the difference between copying and moving?', opts: ['None', 'A move takes over the contents rather than duplicating them', 'Copying is faster'], answer: 1, why: 'A move hands over the internal pointer; a copy duplicates every element. For large data that is an order of magnitude.' },
      { k: 'single', q: 'What does `std::move` do?', opts: ['Moves the object', 'Marks it as movable but does not move it itself', 'Deletes the object'], answer: 1, why: 'It is only a cast. The actual work is done by the move constructor or move assignment.' },
      { k: 'single', q: 'Does the compiler copy when you return a large vector?', opts: ['Yes, always', 'No, it moves or builds it straight into place', 'Only if it is small'], answer: 1, why: 'A returned value moves automatically, and often the compiler builds it directly at the destination. Return by value freely.' },
      { k: 'single', q: 'What state is a moved-from object in?', opts: ['Unusable', 'Valid but unspecified — do not read it', 'Unchanged'], answer: 1, why: 'You may assign to it or destroy it, but you cannot rely on its contents.' },
    ],
    note: {
      summary: ['A copy duplicates, a move takes over — an order of magnitude on large data.', '`std::move` only marks; the move constructor does the work.', 'A value returned from a function moves automatically.', 'Return large objects by value without worry.', 'A moved-from object is valid but unspecified: do not read it.'],
      terms: [{ term: 'move semantics', def: 'Taking over a resource instead of copying it.' }, { term: 'std::move', def: 'A marking that enables a move; it does not move anything itself.' }, { term: 'return value optimisation', def: 'The compiler building a returned object directly at its destination.' }],
    },
  },
  {
    day: 7,
    title: 'Operator overloading',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'In C++ you can say what `+` or `==` means for your own type. That is enormous expressive power — and easily abused.' },
      { k: 'code', lang: 'cpp', src: 'struct Vec2 {\n    double x, y;\n\n    Vec2 operator+(const Vec2 &o) const {\n        return {x + o.x, y + o.y};\n    }\n    bool operator==(const Vec2 &o) const {\n        return x == o.x && y == o.y;\n    }\n};\n\nVec2 a{1, 2}, b{3, 4};\nVec2 c = a + b;      // {4, 6}', explain: 'The `const` after the method promises, here too, that the object is not modified. For an operator that is nearly always true.' },
      { k: 'callout', tone: 'key', md: 'The only good rule: **overload an operator only when the meaning is self-evident**. Adding two vectors, yes. "Adding" two users, no — write a named function there.' },
      { k: 'code', lang: 'cpp', src: 'std::ostream &operator<<(std::ostream &os, const Vec2 &v) {\n    return os << "(" << v.x << ", " << v.y << ")";\n}\n\nstd::cout << a << "\\n";    // (1, 2)', explain: 'Overloading `<<` makes your own type printable. It is one of the most useful overloads — it pays off immediately when debugging.' },
      { k: 'callout', tone: 'warn', md: 'Comparing floating-point numbers with `==` is treacherous: `0.1 + 0.2` is not exactly `0.3`. In real code compare with a tolerance: `std::abs(a - b) < 1e-9`.' },
    ],
    quiz: [
      { k: 'single', q: 'When is overloading an operator worthwhile?', opts: ['Always, if possible', 'When the meaning is self-evident', 'Never'], answer: 1, why: 'Adding two vectors is unambiguous. If you have to explain what `+` means, use a named function instead.' },
      { k: 'single', q: 'What is overloading `<<` for?', opts: ['Bit shifting', 'Making your own type printable with cout', 'Comparison'], answer: 1, why: 'It pays off immediately in debugging: your type prints like any built-in one.' },
      { k: 'single', q: 'Why is floating-point `==` treacherous?', opts: ['It is slow', 'Rounding makes two nominally equal values differ', 'It will not compile'], answer: 1, why: '`0.1 + 0.2` is not exactly `0.3` in binary. Compare with a tolerance.' },
      { k: 'single', q: 'What does `const` promise after an operator method?', opts: ['It is fast', 'It does not modify the object', 'It does not throw'], answer: 1, why: 'The same as on any method: the compiler checks that no field is written.' },
    ],
    note: {
      summary: ['On your own type you can define what `+`, `==`, `<<` and others mean.', 'Overload only when the meaning is self-evident.', 'Overloading `<<` makes your type printable — invaluable when debugging.', 'Mark operator methods `const`.', 'Compare floating-point values with a tolerance, not `==`.'],
      terms: [{ term: 'operator overloading', def: 'Giving a built-in operator a meaning for your own type.' }, { term: 'stream operator', def: 'Overloading `<<` for printing.' }, { term: 'floating-point tolerance', def: 'Approximate comparison with a small permitted difference.' }],
    },
  },
  {
    day: 8,
    title: 'Inheritance and virtual methods',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'C++ inheritance resembles Java\'s, with one essential difference: here you have to **say** that a method may be overridden.' },
      { k: 'code', lang: 'cpp', src: 'class Robot {\npublic:\n    virtual void move() const { std::cout << "moves\\n"; }\n    virtual ~Robot() = default;      // IMPORTANT\n};\n\nclass Rover : public Robot {\npublic:\n    void move() const override { std::cout << "rolls\\n"; }\n};', explain: '`virtual` makes it overridable, and `override` has the compiler check that you really are overriding something — a typo becomes an error.' },
      { k: 'callout', tone: 'warn', md: 'If a class has a `virtual` method, its **destructor must be virtual too**. Without that, `delete` through a base pointer does not call the derived destructor, and resources leak.' },
      { k: 'code', lang: 'cpp', src: 'std::vector<std::unique_ptr<Robot>> fleet;\nfleet.push_back(std::make_unique<Rover>());\n\nfor (const auto &r : fleet) r->move();    // "rolls"', explain: 'Polymorphism works **through a pointer or reference**. Stored by value, the derived part would be sliced off.' },
      { k: 'callout', tone: 'key', md: 'That is **object slicing**: copy as `Robot r = rover;` and only the base part survives; the rest is lost. Hence polymorphic objects are always stored by pointer.' },
    ],
    quiz: [
      { k: 'single', q: 'What does `virtual` mean?', opts: ['The class is abstract', 'The method can be overridden in a subclass', 'The method is private'], answer: 1, why: 'In C++ a method is not overridable by default. `virtual` turns on runtime dispatch.' },
      { k: 'single', q: 'Why is a virtual destructor needed?', opts: ['It is faster', 'So deleting through a base pointer also runs the derived destructor', 'It is required'], answer: 1, why: 'Without it only the base destructor runs and the derived resources leak.' },
      { k: 'single', q: 'What is object slicing?', opts: ['Splitting memory', 'The derived part being lost when copying by value', 'An optimisation'], answer: 1, why: 'Only the base part fits in a base-typed variable. That is why polymorphic objects are stored by pointer.' },
      { k: 'single', q: 'What is the `override` keyword for?', opts: ['Speed', 'The compiler checks that you really override a virtual method', 'It makes overriding mandatory'], answer: 1, why: 'A misspelt name or differing signature becomes a compile error rather than a quietly new method.' },
    ],
    note: {
      summary: ['In C++ a method is not overridable by default; `virtual` enables it.', '`override` has the compiler verify that you are really overriding.', 'A class with virtual methods needs a virtual destructor.', 'Polymorphism works through a pointer or reference.', 'Object slicing: copying by value loses the derived part.'],
      terms: [{ term: 'virtual', def: 'A keyword making a method call resolve at runtime.' }, { term: 'override', def: 'A marker the compiler checks when overriding.' }, { term: 'object slicing', def: 'Losing the derived part when copying by value.' }],
    },
  },
  {
    day: 9,
    title: 'Abstract classes',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'An **abstract class** is one you cannot instantiate: it describes a contract that subclasses must fulfil.' },
      { k: 'code', lang: 'cpp', src: 'class Sensor {\npublic:\n    virtual double read() const = 0;    // pure virtual\n    virtual ~Sensor() = default;\n};\n\nclass Ultrasonic : public Sensor {\npublic:\n    double read() const override { return 12.5; }\n};', explain: 'The `= 0` makes it pure virtual. A class becomes abstract by having at least one such method.' },
      { k: 'callout', tone: 'key', md: 'The abstract class is the **contract**: whatever derives from it can `read()`. From then on, the rest of the code works with any sensor without knowing the concrete types.' },
      { k: 'code', lang: 'cpp', src: 'double average(const std::vector<std::unique_ptr<Sensor>> &sensors) {\n    double total = 0;\n    for (const auto &s : sensors) total += s->read();\n    return sensors.empty() ? 0 : total / sensors.size();\n}', explain: 'This function will never change because you introduce a new sensor type. That is the real value of polymorphism.' },
      { k: 'callout', tone: 'tip', md: 'An abstract class with only pure virtual methods and no state is what other languages call an interface. C++ has no separate keyword for it — it is the same tool.' },
    ],
    quiz: [
      { k: 'single', q: 'What makes a class abstract?', opts: ['The `abstract` keyword', 'Having at least one pure virtual method', 'Having no constructor'], answer: 1, why: '`= 0` marks a pure virtual method. One is enough to make the class impossible to instantiate.' },
      { k: 'single', q: 'How is a pure virtual method written?', opts: ['virtual void f();', 'virtual void f() = 0;', 'abstract void f();'], answer: 1, why: '`= 0` says there is no implementation; the subclass has to supply one.' },
      { k: 'single', q: 'What is an abstract class good for?', opts: ['Faster code', 'Describing a contract so the using code is independent of concrete types', 'Less memory'], answer: 1, why: 'Introducing a new sensor type requires no change to the processing code at all.' },
      { k: 'single', q: 'Does C++ have a separate `interface` keyword?', opts: ['Yes', 'No: a stateless, pure virtual class fills the role', 'Only in a newer standard'], answer: 1, why: 'What other languages call an interface is here an abstract class with no fields.' },
    ],
    note: {
      summary: ['A pure virtual method: `virtual void f() = 0;`.', 'One pure virtual method is enough to make a class abstract.', 'An abstract class cannot be instantiated.', 'Describing the contract makes using code independent of concrete types.', 'C++ has no `interface` keyword: a stateless abstract class serves instead.'],
      terms: [{ term: 'pure virtual method', def: 'A virtual method with no implementation, marked `= 0`.' }, { term: 'abstract class', def: 'A class that cannot be instantiated.' }, { term: 'interface', def: 'A stateless abstract class describing only a contract.' }],
    },
  },
  {
    day: 10,
    title: 'Smart pointers',
    minutes: 24,
    lesson: [
      { k: 'text', md: '`new` and `delete` bring the same trouble as C\'s `malloc`/`free`: they can be forgotten. The **smart pointer** solves it — RAII applied to dynamic memory.' },
      { k: 'code', lang: 'cpp', src: '#include <memory>\n\n{\n    auto r = std::make_unique<Rover>("Mk-I");\n    r->drive(30);\n}   // deleted automatically here — no delete', explain: '`unique_ptr` is the exclusive owner: there is exactly one, and at the end of the scope it releases what it points to.' },
      { k: 'text', md: 'The three tools:\n\n- **`unique_ptr`** — one owner. This is the default.\n- **`shared_ptr`** — several owners, with a count. The last one releases.\n- **`weak_ptr`** — observes without owning. For breaking reference cycles.' },
      { k: 'callout', tone: 'key', md: 'In modern C++ you hardly ever write `new` or `delete`. Use `make_unique` or `make_shared` — and the release happens by itself, even when an exception flies through the code.' },
      { k: 'callout', tone: 'warn', md: '`shared_ptr` is not free: it maintains a count, and a mutual reference (`A` holds `B`, `B` holds `A`) prevents release. Make one direction a `weak_ptr` in that case.' },
    ],
    quiz: [
      { k: 'single', q: 'What is `unique_ptr`?', opts: ['A plain pointer', 'An exclusive owner that releases at the end of scope', 'A copy'], answer: 1, why: 'It has exactly one owner and its destructor deletes the object. No `delete` needed.' },
      { k: 'single', q: 'When should you use `shared_ptr`?', opts: ['Always', 'When several places genuinely need to be owners', 'Never'], answer: 1, why: 'Shared ownership needs a count, which costs. If one owner suffices, `unique_ptr` is better.' },
      { k: 'single', q: 'What is wrong with mutual `shared_ptr` references?', opts: ['Slow', 'The count never reaches zero, so nothing is released', 'It will not compile'], answer: 1, why: 'Each keeps the other alive. Breaking the cycle means making one direction a `weak_ptr`.' },
      { k: 'single', q: 'How many `delete` calls do you write in modern C++?', opts: ['One per new', 'Almost none at all', 'Two'], answer: 1, why: '`make_unique` and `make_shared` handle it. Manual `new`/`delete` is a code smell today.' },
    ],
    note: {
      summary: ['A smart pointer is RAII applied to dynamic memory.', '`unique_ptr`: one owner, automatic release — the default choice.', '`shared_ptr`: several owners with a count; the last one releases.', '`weak_ptr`: observes without owning; breaks reference cycles.', 'In modern C++ use `make_unique` and `make_shared`, not `new`/`delete`.', 'Mutual `shared_ptr` references prevent release.'],
      terms: [{ term: 'smart pointer', def: 'An object managing the lifetime of the memory it points to.' }, { term: 'unique_ptr', def: 'A smart pointer with exclusive ownership.' }, { term: 'weak_ptr', def: 'A non-owning observer, used against reference cycles.' }],
    },
  },
];
