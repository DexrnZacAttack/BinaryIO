import {bWriter, bReader} from "../src/index.js";
import * as fs from 'fs';

const writer = new bWriter(new ArrayBuffer(48));
console.log("Writing unsigned 0xFF");
writer.writeByte(0xFF);
console.log("Writing signed -1");
writer.writeSByte(-1);
console.log("Writing unsigned 0xFFFF");
writer.writeUShort(0xFFFF);
console.log("Writing signed -1");
writer.writeShort(-1);
console.log("Writing unsigned 0xFFFFFF");
writer.writeUInt24(0xFFFFFF);
console.log("Writing signed -1");
writer.writeInt24(-1);
console.log("Writing unsigned 0xFFFFFFFF");
writer.writeUInt(0xFFFFFFFF);
console.log("Writing signed -1");
writer.writeInt(-1);
console.log("Writing unsigned 0xFFFFFFFFFFFFFFFF");
writer.writeULong(0xFFFFFFFFFFFFFFFFn);
console.log("Writing signed -1");
writer.writeLong(-1n);
console.log("Writing float 3.14159");
writer.writeFloat(3.14159);
console.log("Writing double 3.141592653589793");
writer.writeDouble(3.141592653589793);


fs.writeFileSync("writeTest.dat", new Uint8Array(writer.buffer));

const reader = new bReader(new Uint8Array(fs.readFileSync("writeTest.dat")));

console.log("Read unsigned byte (should be 255):", reader.readByte());
console.log("Read signed byte (should be -1):", reader.readSByte());
console.log("Read unsigned short (should be 65535):", reader.readUShort());
console.log("Read signed short (should be -1):", reader.readShort());
console.log("Read unsigned int24 (should be 16777215):", reader.readUInt24());
console.log("Read signed int24 (should be -1):", reader.readInt24());
console.log("Read unsigned int (should be 4294967295):", reader.readUInt());
console.log("Read signed int (should be -1):", reader.readInt());
console.log("Read unsigned long (should be 18446744073709551615):", reader.readULong());
console.log("Read signed long (should be -1):", reader.readLong());
console.log("Read float (should be 3.14159):", reader.readFloat());
console.log("Read double (should be 3.141592653589793):", reader.readDouble());




