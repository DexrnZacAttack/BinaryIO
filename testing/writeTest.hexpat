#pragma author DexrnZacAttack
#pragma description BinaryIO.js test file

import std.string;
import type.guid;
import std.core;
import std.mem;


struct String8 {
    u16 len;
    char string[len] [[name(std::string::to_string(this))]];
};

struct String16 {
    u16 len;
    char16 string[len / 2] [[name(std::string::to_string(this))]];
};

// ImHex/issues/1921
struct String32 {
    u16 len;
    u32 string[len / 4] [[name(std::string::to_string(this))]];
};

struct u40 {
    u8 byte0;
    u8 byte1;
    u8 byte2;
    u8 byte3;
    u8 byte4;
};

struct s40 {
    u8 byte0;
    u8 byte1;
    u8 byte2;
    u8 byte3;
    u8 byte4;
};

struct u56 {
    u8 byte0;
    u8 byte1;
    u8 byte2;
    u8 byte3;
    u8 byte4;
    u8 byte5;
    u8 byte6;
};

struct s56 {
    u8 byte0;
    u8 byte1;
    u8 byte2;
    u8 byte3;
    u8 byte4;
    u8 byte5;
    u8 byte6;
};


struct writerTestBE {
    u8 unsignedByte;     // 1 byte
    s8 signedByte;       // 1 byte
    u16 unsignedShort;   // 2 bytes
    s16 signedShort;     // 2 bytes
    u24 unsignedInt24;   // 3 bytes
    s24 signedInt24;     // 3 bytes
    u32 unsignedInt;     // 4 bytes
    s32 signedInt;       // 4 bytes
    u40 unsignedInt40;   // 5 bytes
    s40 signedInt40;     // 5 bytes
    u48 unsignedInt48;   // 6 bytes
    s48 signedInt48;     // 6 bytes
    u56 unsignedInt56;   // 7 bytes
    s56 signedInt56;     // 7 bytes
    u64 unsignedLong;    // 8 bytes
    s64 signedLong;      // 8 bytes
    u128 unsignedInt128;  // 16 bytes
    s128 signedInt128;  // 16 bytes
    float floatValue;    // 4 bytes
    double doubleValue;  // 8 bytes
    String8 string8;
    String16 string16;
    String32 string32;
    String8 chineseString8;
    String16 chineseString16;
    String32 chineseString32;    
};

struct writerTest {
    std::core::set_endian(std::mem::Endian::Little);
    writerTestBE little;
    std::core::set_endian(std::mem::Endian::Big);
    writerTestBE big;
};

writerTest test @ 0x00;
