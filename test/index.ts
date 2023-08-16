import * as BufferServiceTest from './BufferServiceTest.js';
import * as DateServiceTest from './DateServiceTest.js';
import * as IntegerServiceTest from './IntegerServiceTest.js';
import * as JsonServiceTest from './JsonServiceTest.js';

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
