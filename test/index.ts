import * as BufferServiceTest from './BufferServiceTest';
import * as DateServiceTest from './DateServiceTest';
import * as IntegerServiceTest from './IntegerServiceTest';
import * as JsonServiceTest from './JsonServiceTest';

let failed = 0;
console.log( `Ubdt testing started...\n` );
failed += BufferServiceTest.testStringBuffer();
failed += BufferServiceTest.testBigIntBuffer();
failed += BufferServiceTest.testSha256HashCode();
failed += DateServiceTest.testDateTimeString();
failed += DateServiceTest.testDateTimeValues();
failed += IntegerServiceTest.testRotateUint32Bits();
failed += IntegerServiceTest.testReverseUint32Bytes();
failed += IntegerServiceTest.testRandomizeNumber();
failed += IntegerServiceTest.testGenerateUuid();
failed += JsonServiceTest.testJsonString();
failed += JsonServiceTest.testJsonValues();
console.log( `\nresult: failed ${ failed }` );
