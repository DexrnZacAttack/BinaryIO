import {bWriter, bReader, bTypes} from "../src/index.js";
import * as fs from 'fs';
import { RGBColor, RGBFormat } from "../src/types/RGBA.js";

function randNumber(min: number | bigint, max: number | bigint): bigint | number {
    if (typeof min === 'bigint' || typeof max === 'bigint') {
        const minBigInt = BigInt(min);
        const maxBigInt = BigInt(max);

        const range = maxBigInt - minBigInt + BigInt(1);

        return BigInt(Math.floor(Math.random() * Number(range))) + minBigInt;
    } else {
        return Math.floor(Math.random() * max - min + 1) + min;
    }
}

const randbyte = randNumber(bTypes.BYTE_MIN_VALUE, bTypes.BYTE_MAX_VALUE);
const randsbyte = randNumber(bTypes.SBYTE_MIN_VALUE, bTypes.SBYTE_MAX_VALUE);
const randshort = randNumber(bTypes.SHORT_MIN_VALUE, bTypes.SHORT_MAX_VALUE);
const randushort = randNumber(bTypes.USHORT_MIN_VALUE, bTypes.USHORT_MAX_VALUE);
const randint24 = randNumber(bTypes.INT24_MIN_VALUE, bTypes.INT24_MAX_VALUE);
const randuint24 = randNumber(bTypes.UINT24_MIN_VALUE, bTypes.UINT24_MAX_VALUE);
const randint = randNumber(bTypes.INT_MIN_VALUE, bTypes.INT_MAX_VALUE);
const randuint = randNumber(bTypes.UINT_MIN_VALUE, bTypes.UINT_MAX_VALUE);
const randint40 = randNumber(bTypes.INT40_MIN_VALUE, bTypes.INT40_MAX_VALUE);
const randuint40 = randNumber(bTypes.UINT40_MIN_VALUE, bTypes.UINT40_MAX_VALUE);
const randint48 = randNumber(bTypes.INT48_MIN_VALUE, bTypes.INT48_MAX_VALUE);
const randuint48 = randNumber(bTypes.UINT48_MIN_VALUE, bTypes.UINT48_MAX_VALUE);
const randint56 = randNumber(bTypes.INT56_MIN_VALUE, bTypes.INT56_MAX_VALUE);
const randuint56 = randNumber(bTypes.UINT56_MIN_VALUE, bTypes.UINT56_MAX_VALUE);
const randlong = randNumber(bTypes.LONG_MIN_VALUE, bTypes.LONG_MAX_VALUE);
const randulong = randNumber(bTypes.ULONG_MIN_VALUE, bTypes.ULONG_MAX_VALUE);
const randint128 = randNumber(bTypes.INT128_MIN_VALUE, bTypes.INT128_MAX_VALUE);
const randuint128 = randNumber(bTypes.UINT128_MIN_VALUE, bTypes.UINT128_MAX_VALUE);
const randint256 = randNumber(bTypes.INT256_MIN_VALUE, bTypes.INT256_MAX_VALUE);
const randuint256 = randNumber(bTypes.UINT256_MIN_VALUE, bTypes.UINT256_MAX_VALUE);
const randrgba: RGBColor = new RGBColor(Number(randNumber(bTypes.BYTE_MIN_VALUE, bTypes.BYTE_MAX_VALUE)), Number(randNumber(bTypes.BYTE_MIN_VALUE, bTypes.BYTE_MAX_VALUE)), Number(randNumber(bTypes.BYTE_MIN_VALUE, bTypes.BYTE_MAX_VALUE)), 0xFF);
const rgbString = `0x${randrgba.red.toString(16).toUpperCase().padStart(2, '0')}${randrgba.green.toString(16).toUpperCase().padStart(2, '0')}${randrgba.blue.toString(16).toUpperCase().padStart(2, '0')}${randrgba.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;

const writer = new bWriter(new ArrayBuffer((381) * 2));
function write(endian: boolean) {
    console.log(`Writing ${endian ? "Little" : "Big"} Endian`);
    writer.setEndianness(endian);

    console.log(`Writing unsigned byte 0x${randbyte.toString(16)}`);
    writer.writeByte(Number(randbyte));

    console.log(`Writing signed byte 0x${Number(randsbyte).toString(16)}`);
    writer.writeSByte(Number(randsbyte));

    console.log(`Writing ushort 0x${Number(randushort).toString(16)}`);
    writer.writeUShort(Number(randushort));

    console.log(`Writing short 0x${Number(randshort).toString(16)}`);
    writer.writeShort(Number(randshort));

    console.log(`Writing uint24 0x${Number(randuint24).toString(16)}`);
    writer.writeUInt24(Number(randuint24));

    console.log(`Writing int24 0x${Number(randint24).toString(16)}`);
    writer.writeInt24(Number(randint24));

    console.log(`Writing uint 0x${Number(randuint).toString(16)}`);
    writer.writeUInt(Number(randuint));

    console.log(`Writing int 0x${Number(randint).toString(16)}`);
    writer.writeInt(Number(randint));

    console.log(`Writing uint40 0x${BigInt(randuint40).toString(16)}`);
    writer.writeUInt40(BigInt(randuint40));

    console.log(`Writing int40 0x${BigInt(randint40).toString(16)}`);
    writer.writeInt40(BigInt(randint40));

    console.log(`Writing uint48 0x${BigInt(randuint48).toString(16)}`);
    writer.writeUInt48(BigInt(randuint48));

    console.log(`Writing int48 0x${BigInt(randint48).toString(16)}`);
    writer.writeInt48(BigInt(randint48));

    console.log(`Writing uint56 0x${BigInt(randuint56).toString(16)}`);
    writer.writeUInt56(BigInt(randuint56));

    console.log(`Writing int56 0x${BigInt(randint56).toString(16)}`);
    writer.writeInt56(BigInt(randint56));

    console.log(`Writing ulong 0x${BigInt(randulong).toString(16)}`);
    writer.writeULong(BigInt(randulong));

    console.log(`Writing long 0x${BigInt(randlong).toString(16)}`);
    writer.writeLong(BigInt(randlong));

    console.log(`Writing uint128 0x${BigInt(randuint128).toString(16)}`);
    writer.writeUInt128(BigInt(randuint128));

    console.log(`Writing int128 0x${BigInt(randint128).toString(16)}`);
    writer.writeInt128(BigInt(randint128));

    console.log(`Writing uint256 0x${BigInt(randuint256).toString(16)}`);
    writer.writeUInt256(BigInt(randuint256));

    console.log(`Writing int256 0x${BigInt(randint256).toString(16)}`);
    writer.writeInt256(BigInt(randint256));

    console.log(`Writing float 3.14159`);
    writer.writeFloat(3.14159);

    console.log(`Writing double 3.141592653589793`);
    writer.writeDouble(3.141592653589793);

    console.log(`Writing UTF8 string: "Hello, world!"`);
    writer.writeString8("Hello, world!", true);

    console.log(`Writing UTF16 string: "Hello, world!"`,);
    writer.writeString16("Hello, world!", endian, true);

    console.log(`Writing UTF32 string: "Hello, world!"`);
    writer.writeString32("Hello, world!", endian, true);

    console.log(`Writing UTF8 string: "你好，世界！" ("Hello, world!" in Chinese (Simplified))`);
    writer.writeString8("你好，世界！", true);

    console.log(`Writing UTF16 string: "你好，世界！" ("Hello, world!" in Chinese (Simplified))`,);
    writer.writeString16("你好，世界！", endian, true);

    console.log(`Writing UTF32 string: "你好，世界！" ("Hello, world!" in Chinese (Simplified))`);
    writer.writeString32("你好，世界！", endian, true);

    console.log(`Writing RGB ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.RGB);
    
    console.log(`Writing RGBA ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.RGBA);
    
    console.log(`Writing ARGB ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.ARGB);
    
    console.log(`Writing BGR ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.BGR);
    
    console.log(`Writing BGRA ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.BGRA);
    
    console.log(`Writing ABGR ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.ABGR);
    
    console.log(`Writing GBR ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.GBR);
    
    console.log(`Writing GBRA ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.GBRA);
    
    console.log(`Writing AGBR ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.AGBR);
    
    console.log(`Writing GRB ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.GRB);
    
    console.log(`Writing GRBA ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.GRBA);
    
    console.log(`Writing AGRB ${rgbString}`);
    writer.writeRGB(randrgba, RGBFormat.AGRB);
    
}

write(true);
write(false);

fs.writeFileSync("writeTest.dat", new Uint8Array(writer.arrayBuffer));
const reader = new bReader(new Uint8Array(fs.readFileSync("writeTest.dat")));

compare(true);
compare(false);

function compare(endian: boolean) {
    console.log(`Reading ${endian ? "Little" : "Big"} Endian`);
    reader.setEndianness(endian);

    const byte = reader.readByte();
    console.log(`Read unsigned byte (should be ${randbyte}):`, byte);
    if (byte !== randbyte) throw new Error(`${randbyte} (unsigned byte) does not match ${byte}!`);

    const sbyte = reader.readSByte();
    console.log(`Read signed byte (should be ${randsbyte}):`, sbyte);
    if (sbyte !== randsbyte) throw new Error(`${randsbyte} (signed byte) does not match ${sbyte}!`);

    const ushort = reader.readUShort();
    console.log(`Read unsigned short (should be ${randushort}):`, ushort);
    if (ushort !== randushort) throw new Error(`${randushort} (unsigned short) does not match ${ushort}!`);

    const short = reader.readShort();
    console.log(`Read signed short (should be ${randshort}):`, short);
    if (short !== randshort) throw new Error(`${randshort} (signed short) does not match ${short}!`);

    const uint24 = reader.readUInt24();
    console.log(`Read unsigned int24 (should be ${randuint24}):`, uint24);
    if (uint24 !== randuint24) throw new Error(`${randuint24} (unsigned int24) does not match ${uint24}!`);

    const int24 = reader.readInt24();
    console.log(`Read signed int24 (should be ${randint24}):`, int24);
    if (int24 !== randint24) throw new Error(`${randint24} (signed int24) does not match ${int24}!`);

    const uint = reader.readUInt();
    console.log(`Read unsigned int (should be ${randuint}):`, uint);
    if (uint !== randuint) throw new Error(`${randuint} (unsigned int) does not match ${uint}!`);

    const int = reader.readInt();
    console.log(`Read signed int (should be ${randint}):`, int);
    if (int !== randint) throw new Error(`${randint} (signed int) does not match ${int}!`);

    const uint40 = reader.readUInt40();
    console.log(`Read unsigned int40 (should be ${randuint40}):`, uint40);
    if (uint40 !== randuint40) throw new Error(`${randuint40} (unsigned int40) does not match ${uint40}!`);

    const int40 = reader.readInt40();
    console.log(`Read signed int40 (should be ${randint40}):`, int40);
    if (int40 !== randint40) throw new Error(`${randint40} (signed int40) does not match ${int40}!`);

    const uint48 = reader.readUInt48();
    console.log(`Read unsigned int48 (should be ${randuint48}):`, uint48);
    if (uint48 !== randuint48) throw new Error(`${randuint48} (unsigned int48) does not match ${uint48}!`);

    const int48 = reader.readInt48();
    console.log(`Read signed int48 (should be ${randint48}):`, int48);
    if (int48 !== randint48) throw new Error(`${randint48} (signed int48) does not match ${int48}!`);

    const uint56 = reader.readUInt56();
    console.log(`Read unsigned int56 (should be ${randuint56}):`, uint56);
    if (uint56 !== randuint56) throw new Error(`${randuint56} (unsigned int56) does not match ${uint56}!`);

    const int56 = reader.readInt56();
    console.log(`Read signed int56 (should be ${randint56}):`, int56);
    if (int56 !== randint56) throw new Error(`${randint56} (signed int56) does not match ${int56}!`);

    const ulong = reader.readULong();
    console.log(`Read unsigned long (should be ${randulong}):`, ulong);
    if (ulong !== randulong) throw new Error(`${randulong} (unsigned long) does not match ${ulong}!`);

    const long = reader.readLong();
    console.log(`Read signed long (should be ${randlong}):`, long);
    if (long !== randlong) throw new Error(`${randlong} (signed long) does not match ${long}!`);

    const uint128 = reader.readUInt128();
    console.log(`Read unsigned uint128 (should be ${randuint128}):`, uint128);
    if (uint128 !== randuint128) throw new Error(`${randuint128} (unsigned uint128) does not match ${uint128}!`);

    const int128 = reader.readInt128();
    console.log(`Read signed int128 (should be ${randint128}):`, int128);
    if (int128 !== randint128) throw new Error(`${randint128} (signed int128) does not match ${int128}!`);

    const uint256 = reader.readUInt256();
    console.log(`Read unsigned uint256 (should be ${randuint256}):`, uint256);
    if (uint256 !== randuint256) throw new Error(`${randuint256} (unsigned uint256) does not match ${uint256}!`);

    const int256 = reader.readInt256();
    console.log(`Read signed int256 (should be ${randint256}):`, int256);
    if (int256 !== randint256) throw new Error(`${randint256} (signed int256) does not match ${int256}!`);

    const float = reader.readFloat();
    console.log(`Read float (should be 3.14159):`, float);
    if (Math.abs(float - 3.14159) > 1e-5) throw new Error(`3.14159 (float) does not match ${float}!`);

    const double = reader.readDouble();
    console.log(`Read double (should be 3.141592653589793):`, double);
    if (double !== 3.141592653589793) throw new Error(`3.141592653589793 (double) does not match ${double}!`);

    const string8 = reader.readString8();
    console.log(`Read UTF8 string (should be "Hello world!"):`, string8);
    if (string8 !== "Hello, world!") throw new Error(`"Hello, world!" (UTF8 string) does not match "${string8}"!`);

    const string16 = reader.readString16();
    console.log(`Read UTF16 string (should be "Hello world!"):`, string16);
    if (string16 !== "Hello, world!") throw new Error(`"Hello, world!" (UTF16 string) does not match "${string16}"!`);

    const string32 = reader.readString32();
    console.log(`Read UTF32 string (should be "Hello world!"):`, string32);
    if (string32 !== "Hello, world!") throw new Error(`"Hello, world!" (UTF32 string) does not match "${string32}"!`);

    const string8Chinese = reader.readString8();
    console.log(`Read UTF8 string (should be "你好，世界！" ("Hello, world!" in Chinese (Simplified))):`, string8Chinese);
    if (string8Chinese !== "你好，世界！") throw new Error(`"你好，世界！" (UTF8 string) does not match "${string8Chinese}"!`);

    const string16Chinese = reader.readString16();
    console.log(`Read UTF16 string (should be "你好，世界！" ("Hello, world!" in Chinese (Simplified))):`, string16Chinese);
    if (string16Chinese !== "你好，世界！") throw new Error(`"你好，世界！" (UTF16 string) does not match "${string16Chinese}"!`);

    const string32Chinese = reader.readString32();
    console.log(`Read UTF32 string (should be "你好，世界！" ("Hello, world!" in Chinese (Simplified))):`, string32Chinese);
    if (string32Chinese !== "你好，世界！") throw new Error(`"你好，世界！" (UTF32 string) does not match "${string32Chinese}"!`);

    const rgb = reader.readRGB(RGBFormat.RGB);
    const rgb2String = `0x${rgb.red.toString(16).toUpperCase().padStart(2, '0')}${rgb.green.toString(16).toUpperCase().padStart(2, '0')}${rgb.blue.toString(16).toUpperCase().padStart(2, '0')}${rgb.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read RGB should be ${rgbString}:`, rgb2String);
    if (JSON.stringify(rgb) != JSON.stringify(randrgba)) throw new Error(`${rgb2String} does not match ${rgbString}`);
    
    const rgba = reader.readRGB(RGBFormat.RGBA);
    const rgba2String = `0x${rgba.red.toString(16).toUpperCase().padStart(2, '0')}${rgba.green.toString(16).toUpperCase().padStart(2, '0')}${rgba.blue.toString(16).toUpperCase().padStart(2, '0')}${rgba.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read RGBA should be ${rgbString}:`, rgba2String);
    if (JSON.stringify(rgba) !== JSON.stringify(randrgba)) throw new Error(`${rgba2String} does not match ${rgbString}`);
    
    const argb = reader.readRGB(RGBFormat.ARGB);
    const argb2String = `0x${argb.red.toString(16).toUpperCase().padStart(2, '0')}${argb.green.toString(16).toUpperCase().padStart(2, '0')}${argb.blue.toString(16).toUpperCase().padStart(2, '0')}${argb.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read ARGB should be ${rgbString}:`, argb2String);
    if (JSON.stringify(argb) !== JSON.stringify(randrgba)) throw new Error(`${argb2String} does not match ${rgbString}`);
    
    const bgr = reader.readRGB(RGBFormat.BGR);
    const bgr2String = `0x${bgr.red.toString(16).toUpperCase().padStart(2, '0')}${bgr.green.toString(16).toUpperCase().padStart(2, '0')}${bgr.blue.toString(16).toUpperCase().padStart(2, '0')}${bgr.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read BGR should be ${rgbString}:`, bgr2String);
    if (JSON.stringify(bgr) !== JSON.stringify(randrgba)) throw new Error(`${bgr2String} does not match ${rgbString}`);
    
    const bgra = reader.readRGB(RGBFormat.BGRA);
    const bgra2String = `0x${bgra.red.toString(16).toUpperCase().padStart(2, '0')}${bgra.green.toString(16).toUpperCase().padStart(2, '0')}${bgra.blue.toString(16).toUpperCase().padStart(2, '0')}${bgra.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read BGRA should be ${rgbString}:`, bgra2String);
    if (JSON.stringify(bgra) !== JSON.stringify(randrgba)) throw new Error(`${bgra2String} does not match ${rgbString}`);
    
    const abgr = reader.readRGB(RGBFormat.ABGR);
    const abgr2String = `0x${abgr.red.toString(16).toUpperCase().padStart(2, '0')}${abgr.green.toString(16).toUpperCase().padStart(2, '0')}${abgr.blue.toString(16).toUpperCase().padStart(2, '0')}${abgr.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read ABGR should be ${rgbString}:`, abgr2String);
    if (JSON.stringify(abgr) !== JSON.stringify(randrgba)) throw new Error(`${abgr2String} does not match ${rgbString}`);
    
    const gbr = reader.readRGB(RGBFormat.GBR);
    const gbr2String = `0x${gbr.red.toString(16).toUpperCase().padStart(2, '0')}${gbr.green.toString(16).toUpperCase().padStart(2, '0')}${gbr.blue.toString(16).toUpperCase().padStart(2, '0')}${gbr.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read GBR should be ${rgbString}:`, gbr2String);
    if (JSON.stringify(gbr) !== JSON.stringify(randrgba)) throw new Error(`${gbr2String} does not match ${rgbString}`);
    
    const gbra = reader.readRGB(RGBFormat.GBRA);
    const gbra2String = `0x${gbra.red.toString(16).toUpperCase().padStart(2, '0')}${gbra.green.toString(16).toUpperCase().padStart(2, '0')}${gbra.blue.toString(16).toUpperCase().padStart(2, '0')}${gbra.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read GBRA should be ${rgbString}:`, gbra2String);
    if (JSON.stringify(gbra) !== JSON.stringify(randrgba)) throw new Error(`${gbra2String} does not match ${rgbString}`);
    
    const agbr = reader.readRGB(RGBFormat.AGBR);
    const agbr2String = `0x${agbr.red.toString(16).toUpperCase().padStart(2, '0')}${agbr.green.toString(16).toUpperCase().padStart(2, '0')}${agbr.blue.toString(16).toUpperCase().padStart(2, '0')}${agbr.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read AGBR should be ${rgbString}:`, agbr2String);
    if (JSON.stringify(agbr) !== JSON.stringify(randrgba)) throw new Error(`${agbr2String} does not match ${rgbString}`);
    
    const grb = reader.readRGB(RGBFormat.GRB);
    const grb2String = `0x${grb.red.toString(16).toUpperCase().padStart(2, '0')}${grb.green.toString(16).toUpperCase().padStart(2, '0')}${grb.blue.toString(16).toUpperCase().padStart(2, '0')}${grb.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read GRB should be ${rgbString}:`, grb2String);
    if (JSON.stringify(grb) !== JSON.stringify(randrgba)) throw new Error(`${grb2String} does not match ${rgbString}`);
    
    const grba = reader.readRGB(RGBFormat.GRBA);
    const grba2String = `0x${grba.red.toString(16).toUpperCase().padStart(2, '0')}${grba.green.toString(16).toUpperCase().padStart(2, '0')}${grba.blue.toString(16).toUpperCase().padStart(2, '0')}${grba.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read GRBA should be ${rgbString}:`, grba2String);
    if (JSON.stringify(grba) !== JSON.stringify(randrgba)) throw new Error(`${grba2String} does not match ${rgbString}`);
    
    const agrb = reader.readRGB(RGBFormat.AGRB);
    const agrb2String = `0x${agrb.red.toString(16).toUpperCase().padStart(2, '0')}${agrb.green.toString(16).toUpperCase().padStart(2, '0')}${agrb.blue.toString(16).toUpperCase().padStart(2, '0')}${agrb.alpha?.toString(16).toUpperCase().padStart(2, '0')}`;
    console.log(`Read AGRB should be ${rgbString}:`, agrb2String);
    if (JSON.stringify(agrb) !== JSON.stringify(randrgba)) throw new Error(`${agrb2String} does not match ${rgbString}`);
}