/*
 * Copyright (c) 2024 DexrnZacAttack
 * This file is part of BinaryIO.
 * https://github.com/DexrnZacAttack/BinaryIO
 *
 * File Contributors (based off of GitHub commits):
 * - DexrnZacAttack
 *
 * Licensed under the MIT License. See LICENSE file for details.
*/

export function getBitsFromByte(byte: number): Array<number> {
    if (byte > bTypes.BYTE_MAX_VALUE)
        throw new RangeError('Value out of range for byte');

    const bits: Array<number> = [];

    for (let i = 7; i >= 0; i--)
        bits.push((byte >> i) & 1);

    return bits;
}

export class bTypes {

    static BYTE_MAX_VALUE = 0xFF;
    static BYTE_MIN_VALUE = 0x00;
    
    static SBYTE_MAX_VALUE = 0x7F;
    static SBYTE_MIN_VALUE = -0x80;
    
    static USHORT_MAX_VALUE = 0xFFFF;
    static USHORT_MIN_VALUE = 0x0000;
    
    static SHORT_MAX_VALUE = 0x7FFF;
    static SHORT_MIN_VALUE = -0x8000;
    
    static UINT24_MAX_VALUE = 0xFFFFFF;
    static UINT24_MIN_VALUE = 0x000000;
    
    static INT24_MAX_VALUE = 0x7FFFFF;
    static INT24_MIN_VALUE = -0x800000;
    
    static UINT_MAX_VALUE = 0xFFFFFFFF;
    static UINT_MIN_VALUE = 0x00000000;

    static INT_MAX_VALUE = 0x7FFFFFFF;
    static INT_MIN_VALUE = -0x80000000;

    static UINT40_MAX_VALUE = 0xFFFFFFFFFFn;
    static UINT40_MIN_VALUE = 0x0000000000n;

    static INT40_MAX_VALUE = 0x7FFFFFFFFFn;
    static INT40_MIN_VALUE = -0x8000000000n;

    static UINT48_MAX_VALUE = 0xFFFFFFFFFFFFn;
    static UINT48_MIN_VALUE = 0x000000000000n;

    static INT48_MAX_VALUE = 0x7FFFFFFFFFFFn;
    static INT48_MIN_VALUE = -0x800000000000n;

    static UINT56_MAX_VALUE = 0xFFFFFFFFFFFFFFn;
    static UINT56_MIN_VALUE = 0x00000000000000n;

    static INT56_MAX_VALUE = 0x7FFFFFFFFFFFFFn;
    static INT56_MIN_VALUE = -0x80000000000000n;
    
    static ULONG_MAX_VALUE = 0xFFFFFFFFFFFFFFFFn;
    static ULONG_MIN_VALUE = 0x0000000000000000n;
    
    static LONG_MAX_VALUE = 0x7FFFFFFFFFFFFFFFn;
    static LONG_MIN_VALUE = -0x8000000000000000n;

    static UINT128_MAX_VALUE = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn;
    static UINT128_MIN_VALUE = 0x00000000000000000000000000000000n;

    static INT128_MAX_VALUE = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn;
    static INT128_MIN_VALUE = -0x80000000000000000000000000000000n;

    static UINT256_MAX_VALUE = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn;
    static UINT256_MIN_VALUE = 0x0000000000000000000000000000000000000000000000000000000000000000n;

    static INT256_MAX_VALUE = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn;
    static INT256_MIN_VALUE = -0x8000000000000000000000000000000000000000000000000000000000000000n;
}
