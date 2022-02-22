import { Bit_Operation_Test } from './bit-operation-test';
import { Data_Transformation_Test } from './data-transformation-test';
import { Hash_Code_Test } from './hash-code-test';

const test1 = new Bit_Operation_Test();
test1.test_rotate_uint32();
const test2 = new Data_Transformation_Test();
test2.test_buffer_string();
const test3 = new Hash_Code_Test();
test3.test_sha256_hash_code();
