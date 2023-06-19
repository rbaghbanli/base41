import * as BufferExtTest from './BufferExtTest';
import * as DateExtTest from './DateExtTest';
import * as IntegerExtTest from './IntegerExtTest';
import * as JsonExtTest from './JsonExtTest';

BufferExtTest.testBufferString();
BufferExtTest.testSha256HashCode();
DateExtTest.testDateTimeString();
IntegerExtTest.testRotateUint32Bits();
IntegerExtTest.testReverseUint32Bytes();
IntegerExtTest.testRandomNumber();
IntegerExtTest.testUuid();
JsonExtTest.testJsonString();
JsonExtTest.testJsonValues();
