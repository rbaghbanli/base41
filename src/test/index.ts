import * as DateTimeTest from './DateTimeTest';
import * as BinaryDataTest from './BinaryDataTest';
import * as HashCodeTest from './HashCodeTest';
import * as JsonStringTest from './JsonStringTest';
import * as RandomNumberTest from './RandomNumberTest';

DateTimeTest.testDateTimeString();
BinaryDataTest.testRotateUint32Bits();
BinaryDataTest.testBufferString();
HashCodeTest.testSha256HashCode();
JsonStringTest.testJsonString();
JsonStringTest.testJsonValues();
RandomNumberTest.testRandomNumber();
RandomNumberTest.testUuid();
