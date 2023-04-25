import { DateTimeTest } from './DateTimeTest';
import { BinaryDataTest } from './BinaryDataTest';
import { HashCodeTest } from './HashCodeTest';
import { JsonStringTest } from './JsonStringTest';
import { RandomNumberTest } from './RandomNumberTest';

const test1 = new DateTimeTest();
test1.testDateTimeString();
const test2 = new BinaryDataTest();
test2.testRotateUint32Bits();
test2.testBufferString();
const test3 = new HashCodeTest();
test3.testSha256HashCode();
const test4 = new JsonStringTest();
test4.testJsonString();
const test5 = new RandomNumberTest();
test5.testRandomNumber();
