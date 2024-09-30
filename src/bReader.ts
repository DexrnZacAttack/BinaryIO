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

    /** Reads a UInt24
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

    /** Reads an Int24
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
        // TODO: proper UTF8 support
        let str = "";
        while (true) {
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
        let str = "";
        while (true) {
            const char = this.readUShort(isLittleEndian);
            if (char === 0) break;
            str += String.fromCharCode(char);
        }

        return str;
    }
}
