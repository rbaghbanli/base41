import { DateTimeTest } from './DateTimeTest';
import { BinaryDataTest } from './BinaryDataTest';
import { HashCodeTest } from './HashCodeTest';
import { JsonStringTest } from './JsonStringTest';
import { RandomNumberTest } from './RandomNumberTest';

DateTimeTest.testDateTimeString();
BinaryDataTest.testRotateUint32Bits();
BinaryDataTest.testBufferString();
HashCodeTest.testSha256HashCode();
JsonStringTest.testJsonString();
JsonStringTest.testJsonValues();
RandomNumberTest.testRandomNumber();
RandomNumberTest.testUuid();
