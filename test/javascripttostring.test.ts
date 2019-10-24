import j2s from "../src/javascripttostring";

describe("Null to String", () => {
  it("should convert null to string", () => {
    let actual = j2s(null);
    let expected = 'null';

    expect(actual).toBe(expected);
  });
  it("should convert undefined to string", () => {
    let actual = j2s(undefined);
    let expected = 'undefined';

    expect(actual).toBe(expected);
  });
});

describe("Boolean to String", () => {
  it("should convert true", () => {
    let actual = j2s(true);
    let expected = "true";

    expect(actual).toBe(expected);
  });
  it("should convert false", () => {
    let actual = j2s(false);
    let expected = "false";

    expect(actual).toBe(expected);
  });
  it("should convert boolean object", () => {
    let actual = j2s(new Boolean(1000));
    let expected = "true";

    expect(actual).toBe(expected);
  });
});

describe("Number to String", () => {
  it("should convert 0", () => {
    let actual = j2s(0);
    let expected = "0";

    expect(actual).toBe(expected);
  });
  it("should convert numbers 0 < N < 1", () => {
    let actual = j2s(0.75);
    let expected = "0.75";

    expect(actual).toBe(expected);
  });
  it("should convert negative numbers", () => {
    let actual = j2s(-123);
    let expected = "-123";

    expect(actual).toBe(expected);
  });
  it("should convert positive numbers", () => {
    let actual = j2s(456);
    let expected = "456";

    expect(actual).toBe(expected);
  });
  it("should convert infinity", () => {
    let actual1 = j2s(Number.POSITIVE_INFINITY);
    let expected1 = "Number.POSITIVE_INFINITY";
    let actual2 = j2s(Number.NEGATIVE_INFINITY);
    let expected2 = "Number.NEGATIVE_INFINITY";

    expect(actual1).toBe(expected1);
    expect(actual2).toBe(expected2);
  });
  it("should convert min/max values", () => {
    let actual1 = j2s(Number.MAX_VALUE);
    let expected1 = "Number.MAX_VALUE";
    let actual2 = j2s(Number.MIN_VALUE);
    let expected2 = "Number.MIN_VALUE";

    expect(actual1).toBe(expected1);
    expect(actual2).toBe(expected2);
  });
  it("should convert BigInt numbers", () => {
    let actual = j2s(BigInt(9007199254740991));
    let expected = "BigInt(9007199254740991)";

    expect(actual).toBe(expected);
  });
});

describe("Symbol to String", () => {
  it("should convert empty Symbol", () => {
    let actual = j2s(Symbol());
    let expected = 'Symbol()';

    expect(actual).toBe(expected);
  });
  it("should convert Symbol with description", () => {
    let actual = j2s(Symbol('Hello'));
    let expected = 'Symbol(\"Hello\")';

    expect(actual).toBe(expected);
  });
  it("should convert built-in symbols", () => {
    expect(j2s(Symbol.iterator)).toBe('Symbol.iterator');
    expect(j2s(Symbol.asyncIterator)).toBe('Symbol.asyncIterator');
    expect(j2s(Symbol.hasInstance)).toBe('Symbol.hasInstance');
  });
});

describe("String to String", () => {
  it("should convert empty string", () => {
    let actual = j2s("");
    let expected = '""';

    expect(actual).toBe(expected);
  });
  it("should convert a string", () => {
    let actual = j2s(
      "JavaScript value to string converter. It converts a runtime value into string value."
    );
    let expected =
      '"JavaScript value to string converter. It converts a runtime value into string value."';

    expect(actual).toBe(expected);
  });
  it("should convert special symbols", () => {
    let actual = j2s("Check symbols: '\"\t\n—“”⚡");
    let expected = '"Check symbols: \'\\"\\t\\n—“”⚡"';

    expect(actual).toBe(expected);
  });
});

describe("RegExp to String", () => {
  it("should convert RegExp", () => {
    let actual = j2s(/s+/gi);
    let expected = '/s+/gi';

    expect(actual).toBe(expected);
  });
});

describe("Error to String", () => {
  it("should convert Error", () => {
    let actual = j2s(new Error("A mistake"));
    let expected = 'new Error("A mistake", undefined, undefined)';

    expect(actual).toBe(expected);
  });
});


describe("Array to String", () => {
  it("should convert empty Array", () => {
    let actual = j2s([]);
    let expected = '[]';

    expect(actual).toBe(expected);
  });
  it("should convert an Array", () => {
    let actual = j2s([1,2,3,'hello', 'world']);
    let expected = '[1, 2, 3, "hello", "world"]';

    expect(actual).toBe(expected);
  });
});

describe("Function to String", () => {
  it("should convert an anonymous function", () => {
    let stringFunction = j2s(function(a: any, b: any, c: any) {
      return a + b + c;
    });
    let actual = Function("return " + stringFunction)();
    let expected = 6;

    expect(actual(1, 2, 3)).toBe(expected);
  });
  it("should convert an named function", () => {
    function sum(...numbers: number[]) {
      console.log(numbers);
      return Array.prototype.reduce.call(
        numbers,
        (accumulator: any, currentValue: any) => {
          return accumulator + currentValue;
        }, 0
      );
    }

    let stringFunction = j2s(sum);
    let actual = Function("return " + stringFunction)();
    let expected = 10;

    expect(actual(1,2,3,4)).toBe(expected);
  });
  it("should convert lambda function", () => {
    let stringFunction = j2s((a: any, b: any) => {
      return a * b;
    });
    let actual = Function("return " + stringFunction)();
    let expected = 12;

    expect(actual(3,4)).toBe(expected);
  });
  it("should convert class", () => {
    let stringFunction = j2s(
      class TestClass{
        public TestVariable: string;
        constructor() {
          this.TestVariable = "Hello Test";
        }
      });
    let actualClass = Function("return " + stringFunction)();
    let actualObject = new actualClass();
    let expected = "Hello Test";

    expect(actualObject.TestVariable).toBe(expected);
  });
  it("should work with function prototype", () => {
    class TestClass {
      public TestVariable: string;
      constructor() {
        this.TestVariable = "Hello Test";
      }

      public TestMethod(): string {
        return "It Works";
      }
    }

    let stringFunction = j2s(TestClass);
    let actualClass = Function("return " + stringFunction)();
    let actualObject = new actualClass();
    let expected = "It Works";

    expect(actualObject.TestMethod()).toBe(expected); //TBD make it to work
  });
});

describe("Object to String", () => {
  it("should convert empty Object", () => {
    let actual = j2s({});
    let expected = '{}';

    expect(actual).toBe(expected);
  });
  it("should convert an Object", () => {
    let stringObject = j2s({
      a: 1,
      hello: 'world',
      innerObject: {
        testFunction: (x1: number, y1: number, x2: number, y2: number) => {
          return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5);
        }
      }
    });
    let actual = Function("return " + stringObject)();
    let expected1 = 1;
    let expected2 = 'world';
    let expected3 = 5;

    expect(actual.a).toBe(expected1);
    expect(actual.hello).toBe(expected2);
    expect(actual.innerObject).toBeDefined();
    expect(actual.innerObject.testFunction(3,0,0,4)).toBe(expected3);
  });
});