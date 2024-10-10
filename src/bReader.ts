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

import { bCommons } from "./bCommons.js";
import { RGBColor, RGBFormat } from "./types/RGBA.js";

export class bReader extends bCommons {
    /** Creates an endianness-aware binary reader with built in position tracking
     * @param readBuffer The input data
     * @param isLittle Whether or not to read as Little Endian
     * @param curPos Position to start at
    */
    constructor(readBuffer: Uint8Array | ArrayBuffer | DataView = new Uint8Array, isLittle: boolean = false, curPos = 0) {
        super(readBuffer, isLittle, curPos);
    }

    /** Reads {size} amount of bytes
     * @param size How many bytes to read
     * @returns The read bytes in an ArrayBuffer (Uint8Array)
    */
    public read(size: number): ArrayBuffer {
        const ab = new Uint8Array(size);
        for (let i = 0; i < size; i++) {
            const byte = this.readByte();
            ab[i] = byte;
        }

        return ab.buffer;
    }

    /** Reads a Byte
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readByte(peek: boolean = false): number {
        const byte = this.buffer[this.curPos]!;
        if (!peek)
            this.curPos++;
        return byte;
    }

    /** Reads a signed Byte
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readSByte(peek: boolean = false): number {
        const sbyte = this.buffer[this.curPos]!;
        if (!peek)
            this.curPos++;
        return (sbyte << 24) >> 24;
    }

    /** Reads a UShort
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
    */
    public readUShort(isLittleEndian = this.isLittle, peek: boolean = false): number {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!
        ];

        let ushort: number = 0;
        if (isLittleEndian) {
            ushort = bytes.reduce((acc, byte, i) => acc | (byte << (8 * i)), 0);
        } else {
            ushort = bytes.reduce((acc, byte, i) => acc | (byte << (8 * (1 - i))), 0);
        }

        if (!peek)
            this.curPos += 2;
        return ushort;
    }


    /** Reads a Short
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
    */
    public readShort(isLittleEndian = this.isLittle, peek: boolean = false): number {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!
        ];

        let short: number = 0;
        if (isLittleEndian) {
            short = bytes.reduce((acc, byte, i) => acc | (byte << (8 * i)), 0);
        } else {
            short = bytes.reduce((acc, byte, i) => acc | (byte << (8 * (1 - i))), 0);
        }
        if (!peek)
            this.curPos += 2;
        return (short << 16) >> 16;
    }

    /** Reads a UInt24 (24 bit unsigned integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
    */
    public readUInt24(isLittleEndian = this.isLittle, peek: boolean = false): number {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
        ];

        let uint24: number = 0;
        if (isLittleEndian) {
            uint24 = bytes.reduce((acc, byte, i) => acc | (byte << (8 * i)), 0);
        } else {
            uint24 = bytes.reduce((acc, byte, i) => acc | (byte << (8 * (2 - i))), 0);
        }
        if (!peek)
            this.curPos += 3;

        return uint24;
    }

    /** Reads an Int24 (24 bit signed integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readInt24(isLittleEndian = this.isLittle, peek: boolean = false): number {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
        ];

        let int24: number = 0;
        if (isLittleEndian) {
            int24 = bytes.reduce((acc, byte, i) => acc | (byte << (8 * i)), 0);
        } else {
            int24 = bytes.reduce((acc, byte, i) => acc | (byte << (8 * (2 - i))), 0);
        }

        if (int24 & 0x800000) {
            int24 -= 0x1000000;
        }

        if (!peek)
            this.curPos += 3;
        return int24;
    }

    /** Reads a UInt
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readUInt(isLittleEndian = this.isLittle, peek: boolean = false): number {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
        ];

        let uint: number = 0;
        if (isLittleEndian) {
            uint = bytes.reduce((acc, byte, i) => acc | (byte << (8 * i)), 0);
        } else {
            uint = bytes.reduce((acc, byte, i) => acc | (byte << (8 * (3 - i))), 0);
        }

        if (!peek)
            this.curPos += 4;

        return uint >>> 0;
    }

    /** Reads an Int
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readInt(isLittleEndian = this.isLittle, peek: boolean = false): number {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
        ];

        let int: number = 0;
        if (isLittleEndian) {
            int = bytes.reduce((acc, byte, i) => acc | (byte << (8 * i)), 0);
        } else {
            int = bytes.reduce((acc, byte, i) => acc | (byte << (8 * (3 - i))), 0);
        }

        if (int & 0x80000000) {
            int -= 0x100000000;
        }

        if (!peek)
            this.curPos += 4;

        return int | 0;
    }

    /** Reads an Int40 (40-bit signed integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readInt40(isLittleEndian = this.isLittle, peek: boolean = false): bigint {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
        ];

        let int40: bigint = 0n;

        if (isLittleEndian) {
            int40 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            int40 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(4 - i))), 0n);
        }

        if (!peek) {
            this.curPos += 5;
        }

        return (int40 & (1n << 39n)) !== 0n ? int40 - (1n << 40n) : int40;
    }

    /** Reads an UInt40 (40-bit unsigned integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readUInt40(isLittleEndian = this.isLittle, peek: boolean = false): bigint {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
        ];

        let uint40: bigint = 0n;
        if (isLittleEndian) {
            uint40 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            uint40 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(4 - i))), 0n);
        }

        if (!peek) {
            this.curPos += 5;
        }

        return uint40;
    }

    /** Reads an Int48 (48-bit signed integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readInt48(isLittleEndian = this.isLittle, peek: boolean = false): bigint {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
        ];

        let int48: bigint = 0n;

        if (isLittleEndian) {
            int48 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            int48 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(5 - i))), 0n);
        }

        if (!peek) {
            this.curPos += 6;
        }

        return (int48 & (1n << 47n)) !== 0n ? int48 - (1n << 48n) : int48;
    }

    /** Reads an UInt48 (48-bit unsigned integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readUInt48(isLittleEndian = this.isLittle, peek: boolean = false): bigint {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
        ];

        let uint48: bigint = 0n;
        if (isLittleEndian) {
            uint48 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            uint48 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(5 - i))), 0n);
        }

        if (!peek) {
            this.curPos += 6;
        }

        return uint48;
    }

    /** Reads an Int56 (56-bit signed integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readInt56(isLittleEndian = this.isLittle, peek: boolean = false): bigint {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
        ];

        let int56: bigint = 0n;

        if (isLittleEndian) {
            int56 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            int56 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(6 - i))), 0n);
        }

        if (!peek) {
            this.curPos += 7;
        }

        return (int56 & (1n << 55n)) !== 0n ? int56 - (1n << 56n) : int56;
    }

    /** Reads an UInt56 (56-bit unsigned integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readUInt56(isLittleEndian = this.isLittle, peek: boolean = false): bigint {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
        ];

        let uint56: bigint = 0n;
        if (isLittleEndian) {
            uint56 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            uint56 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(6 - i))), 0n);
        }

        if (!peek) {
            this.curPos += 7;
        }

        return uint56;
    }

    /** Reads a Long
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
    */
    public readLong(isLittleEndian = this.isLittle, peek: boolean = false): BigInt {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
            this.buffer[this.curPos + 7]!
        ];

        let long: bigint = 0n;
        if (isLittleEndian) {
            long = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            long = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(7 - i))), 0n);
        }

        if (!peek)
            this.curPos += 8;
        return (long >= (1n << 63n)) ? long - (1n << 64n) : long;
    }

    /** Reads a ULong
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readULong(isLittleEndian = this.isLittle, peek: boolean = false): BigInt {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
            this.buffer[this.curPos + 7]!
        ];

        let ulong: bigint = 0n;
        if (isLittleEndian) {
            ulong = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            ulong = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(7 - i))), 0n);
        }
        if (!peek)
            this.curPos += 8;
        return ulong;
    }

    /** Reads an Int128 (128-bit signed integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
    */
    public readInt128(isLittleEndian = this.isLittle, peek: boolean = false): BigInt {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
            this.buffer[this.curPos + 7]!,
            this.buffer[this.curPos + 8]!,
            this.buffer[this.curPos + 9]!,
            this.buffer[this.curPos + 10]!,
            this.buffer[this.curPos + 11]!,
            this.buffer[this.curPos + 12]!,
            this.buffer[this.curPos + 13]!,
            this.buffer[this.curPos + 14]!,
            this.buffer[this.curPos + 15]!
        ];

        let int128: bigint = 0n;
        if (isLittleEndian) {
            int128 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            int128 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(15 - i))), 0n);
        }

        if (!peek)
            this.curPos += 16;
        return (int128 >= (1n << 127n)) ? int128 - (1n << 128n) : int128;
    }

    /** Reads a UInt128 (128-bit unsigned integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readUInt128(isLittleEndian = this.isLittle, peek: boolean = false): BigInt {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
            this.buffer[this.curPos + 7]!,
            this.buffer[this.curPos + 8]!,
            this.buffer[this.curPos + 9]!,
            this.buffer[this.curPos + 10]!,
            this.buffer[this.curPos + 11]!,
            this.buffer[this.curPos + 12]!,
            this.buffer[this.curPos + 13]!,
            this.buffer[this.curPos + 14]!,
            this.buffer[this.curPos + 15]!
        ];

        let uint128: bigint = 0n;
        if (isLittleEndian) {
            uint128 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            uint128 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(15 - i))), 0n);
        }
        if (!peek)
            this.curPos += 16;
        return uint128;
    }

    /** Reads an Int256 (256-bit signed integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
    */
    public readInt256(isLittleEndian = this.isLittle, peek: boolean = false): BigInt {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
            this.buffer[this.curPos + 7]!,
            this.buffer[this.curPos + 8]!,
            this.buffer[this.curPos + 9]!,
            this.buffer[this.curPos + 10]!,
            this.buffer[this.curPos + 11]!,
            this.buffer[this.curPos + 12]!,
            this.buffer[this.curPos + 13]!,
            this.buffer[this.curPos + 14]!,
            this.buffer[this.curPos + 15]!,
            this.buffer[this.curPos + 16]!,
            this.buffer[this.curPos + 17]!,
            this.buffer[this.curPos + 18]!,
            this.buffer[this.curPos + 19]!,
            this.buffer[this.curPos + 20]!,
            this.buffer[this.curPos + 21]!,
            this.buffer[this.curPos + 22]!,
            this.buffer[this.curPos + 23]!,
            this.buffer[this.curPos + 24]!,
            this.buffer[this.curPos + 25]!,
            this.buffer[this.curPos + 26]!,
            this.buffer[this.curPos + 27]!,
            this.buffer[this.curPos + 28]!,
            this.buffer[this.curPos + 29]!,
            this.buffer[this.curPos + 30]!,
            this.buffer[this.curPos + 31]!
        ];

        let int256: bigint = 0n;
        if (isLittleEndian) {
            int256 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            int256 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(31 - i))), 0n);
        }

        if (!peek)
            this.curPos += 32;
        return (int256 >= (1n << 255n)) ? int256 - (1n << 256n) : int256;
    }

    /** Reads a UInt256 (256-bit unsigned integer)
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readUInt256(isLittleEndian = this.isLittle, peek: boolean = false): BigInt {
        const bytes = [
            this.buffer[this.curPos]!,
            this.buffer[this.curPos + 1]!,
            this.buffer[this.curPos + 2]!,
            this.buffer[this.curPos + 3]!,
            this.buffer[this.curPos + 4]!,
            this.buffer[this.curPos + 5]!,
            this.buffer[this.curPos + 6]!,
            this.buffer[this.curPos + 7]!,
            this.buffer[this.curPos + 8]!,
            this.buffer[this.curPos + 9]!,
            this.buffer[this.curPos + 10]!,
            this.buffer[this.curPos + 11]!,
            this.buffer[this.curPos + 12]!,
            this.buffer[this.curPos + 13]!,
            this.buffer[this.curPos + 14]!,
            this.buffer[this.curPos + 15]!,
            this.buffer[this.curPos + 16]!,
            this.buffer[this.curPos + 17]!,
            this.buffer[this.curPos + 18]!,
            this.buffer[this.curPos + 19]!,
            this.buffer[this.curPos + 20]!,
            this.buffer[this.curPos + 21]!,
            this.buffer[this.curPos + 22]!,
            this.buffer[this.curPos + 23]!,
            this.buffer[this.curPos + 24]!,
            this.buffer[this.curPos + 25]!,
            this.buffer[this.curPos + 26]!,
            this.buffer[this.curPos + 27]!,
            this.buffer[this.curPos + 28]!,
            this.buffer[this.curPos + 29]!,
            this.buffer[this.curPos + 30]!,
            this.buffer[this.curPos + 31]!
        ];

        let uint256: bigint = 0n;
        if (isLittleEndian) {
            uint256 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(i))), 0n);
        } else {
            uint256 = bytes.reduce((acc, byte, i) => acc | (BigInt(byte) << (8n * BigInt(31 - i))), 0n);
        }
        if (!peek)
            this.curPos += 32;
        return uint256;
    }

    /** Reads a Float
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readFloat(isLittleEndian = this.isLittle, peek: boolean = false): number {
        const uint8Array = new Uint8Array(4);
        if (isLittleEndian) {
            for (let i = 0; i < 4; i++) {
                uint8Array[i] = this.buffer[this.curPos + i]!;
            }
        } else {
            for (let i = 3; i >= 0; i--) {
                uint8Array[3 - i] = this.buffer[this.curPos + i]!;
            }
        }

        const floatArray = new Float32Array(uint8Array.buffer);
        if (!peek) {
            this.curPos += 4;
        }
        return floatArray[0]!;
    }


    /** Reads a Double
     * @param isLittleEndian Whether or not to read as Little Endian
     * @param peek Whether or not to peek, which doesn't increment the position in the stream.
     */
    public readDouble(isLittleEndian = this.isLittle, peek: boolean = false) {
        const uint8Array = new Uint8Array(8);
        if (isLittleEndian) {
            for (let i = 0; i < 8; i++) {
                uint8Array[i] = this.buffer[this.curPos + i]!;
            }
        } else {
            for (let i = 7; i >= 0; i--) {
                uint8Array[7 - i] = this.buffer[this.curPos + i]!;
            }
        }

        const doubleArray = new Float64Array(uint8Array.buffer);
        if (!peek)
            this.curPos += 8;
        return doubleArray[0];
    }

    /** Reads a UTF32 string
     * @param Length Length of the string in bytes, including null bytes. By default it reads a UShort before the string.
     * @param isLittleEndian Whether or not to read as Little Endian
    */
    public readString32(length: number = this.readUShort(), isLittleEndian = this.isLittle): string {
        let str = "";
        for (var i = 0; i < (length / 4); i++) {
            str += String.fromCodePoint(this.readUInt(isLittleEndian));
        }
        return str.replace(/\x00/g, '');
    }

    /** Reads a UTF16 string
     * @param Length Length of the string in bytes, including null bytes. By default it reads a UShort before the string.
     * @param isLittleEndian Whether or not to read as Little Endian
    */
    public readString16(length: number = this.readUShort(), isLittleEndian = this.isLittle): string {
        let str = "";
        for (var i = 0; i < (length / 2); i++) {
            str += String.fromCharCode(this.readUShort(isLittleEndian));
        }
        return str.replace(/\x00/g, '');
    }

    /** Reads a UTF-8 string
     * @param length Length of the string in bytes, by default it reads a UShort before the string.
     */
    public readString8(length: number = this.readUShort()): string {
        let str = "";
        let bytesRead = 0;

        while (bytesRead < length) {
            const char = this.readByte();

            if (char < 0x80) {
                str += String.fromCharCode(char);
                bytesRead++;
            } else if (char < 0xE0) {
                str += String.fromCharCode(((char & 0x1F) << 6) | (this.readByte() & 0x3F));
                bytesRead += 2;
            } else if (char < 0xF0) {
                str += String.fromCharCode(((char & 0x0F) << 12) | ((this.readByte() & 0x3F) << 6) | (this.readByte() & 0x3F));
                bytesRead += 3;
            } else {
                str += String.fromCodePoint(((char & 0x07) << 18) | ((this.readByte() & 0x3F) << 12) | ((this.readByte() & 0x3F) << 6) | (this.readByte() & 0x3F));
                bytesRead += 4;
            }
        }

        return str;
    }

    /** Reads a null-terminated UTF8 string */
    public readNullTerminatedString8(): string {
        // TODO: merge with readString8
        let str = "";
        while (this.pos < this.byteLength) {
            const byte = this.readByte();
            if (byte === 0x00) {
                break;
            }
            str += String.fromCharCode(byte);
        }
        return str;
    }

    /**
     * Reads a null-terminated UTF16 string
     * @param isLittleEndian Whether or not to read as Little Endian
     */
    public readNullTerminatedString16(isLittleEndian = this.isLittle): string {
        // TODO: merge with readString16
        let str = "";
        while (this.pos < this.byteLength) {
            const char = this.readUShort(isLittleEndian);
            if (char === 0) break;
            str += String.fromCharCode(char);
        }

        return str;
    }

    public readRGB(format: RGBFormat): RGBColor {
        const rgb: RGBColor = new RGBColor(0, 0, 0, 0xFF);
    
        switch (format) {
            case RGBFormat.RGB:
                rgb.red = this.readByte();
                rgb.green = this.readByte();
                rgb.blue = this.readByte();
                break;
            case RGBFormat.RGBA:
                rgb.red = this.readByte();
                rgb.green = this.readByte();
                rgb.blue = this.readByte();
                rgb.alpha = this.readByte();
                break;
            case RGBFormat.ARGB:
                rgb.alpha = this.readByte();
                rgb.red = this.readByte();
                rgb.green = this.readByte();
                rgb.blue = this.readByte();
                break;
            case RGBFormat.BGR:
                rgb.blue = this.readByte();
                rgb.green = this.readByte();
                rgb.red = this.readByte();
                break;
            case RGBFormat.BGRA:
                rgb.blue = this.readByte();
                rgb.green = this.readByte();
                rgb.red = this.readByte();
                rgb.alpha = this.readByte();
                break;
            case RGBFormat.ABGR:
                rgb.alpha = this.readByte();
                rgb.blue = this.readByte();
                rgb.green = this.readByte();
                rgb.red = this.readByte();
                break;
            case RGBFormat.GBR:
                rgb.green = this.readByte();
                rgb.blue = this.readByte();
                rgb.red = this.readByte();
                break;
            case RGBFormat.GBRA:
                rgb.green = this.readByte();
                rgb.blue = this.readByte();
                rgb.red = this.readByte();
                rgb.alpha = this.readByte();
                break;
            case RGBFormat.AGBR:
                rgb.alpha = this.readByte();
                rgb.green = this.readByte();
                rgb.blue = this.readByte();
                rgb.red = this.readByte();
                break;
            case RGBFormat.GRB:
                rgb.green = this.readByte();
                rgb.red = this.readByte();
                rgb.blue = this.readByte();
                break;
            case RGBFormat.GRBA:
                rgb.green = this.readByte();
                rgb.red = this.readByte();
                rgb.blue = this.readByte();
                rgb.alpha = this.readByte();
                break;
            case RGBFormat.AGRB:
                rgb.alpha = this.readByte();
                rgb.green = this.readByte();
                rgb.red = this.readByte();
                rgb.blue = this.readByte();
                break;
            default:
                throw new Error(`Unknown format: ${format}`);
        }
    
        return rgb;
    }
}
