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
import { bTypes } from './bExtra.js';

export class bWriter extends bCommons {
    /** Creates an endianness-aware binary writer with built-in position tracking
     * @param writeBuffer What to output the data into
     * @param isLittle Whether or not to read as Little Endian
     * @param curPos Position to start at
    */
    constructor(writeBuffer: Uint8Array | ArrayBuffer | DataView, isLittle: boolean = false, curPos = 0) {
        super(writeBuffer, isLittle, curPos);
    }

    /** Writes bytes from an array.
    * @param bytes Array of bytes to write
    */
    public write(bytes: Uint8Array): void {
        bytes.forEach(byte => {
            this.writeByte(byte);
        });
    }

    /** Writes x amount of the same byte.
    * @param byte Byte to write
    * @param amount Amount of that byte to write
    */
    public writeAmountOfBytes(byte: number, amount: number): void {
        for (var i = 0; i < amount; i++)
            this.writeByte(byte);
    }

    /** Writes an unsigned Byte
     * @param value The value to write.
    */
    public writeByte(value: number): void {
        if (value < bTypes.BYTE_MIN_VALUE || value > bTypes.BYTE_MAX_VALUE)
            throw new Error(`Value (${value}) out of range for unsigned byte`);

        this.buffer[this.curPos++] = value;
    }

    /** Writes a signed Byte
     * @param value The value to write.
    */
    public writeSByte(value: number): void {
        if (value < bTypes.SBYTE_MIN_VALUE || value > bTypes.SBYTE_MAX_VALUE)
            throw new Error(`Value (${value}) out of range for signed byte`);

        this.buffer[this.curPos++] = (value & 0xFF);
    }

    /** Writes an unsigned Short
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
    */
    public writeUShort(value: number, isLittleEndian = this.isLittle): void {
        if (value < bTypes.USHORT_MIN_VALUE || value > bTypes.USHORT_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for unsigned short`);

        if (isLittleEndian) {
            this.buffer[this.curPos] = value & 0xFF;
            this.buffer[this.curPos + 1] = (value >> 8) & 0xFF;
        } else {
            this.buffer[this.curPos] = (value >> 8) & 0xFF;
            this.buffer[this.curPos + 1] = value & 0xFF;
        }

        this.curPos += 2;
    }


    /** Writes a signed Short
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
    */
    public writeShort(value: number, isLittleEndian = this.isLittle): void {
        if (value < bTypes.SHORT_MIN_VALUE || value > bTypes.SHORT_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for signed short`);

        const short = value < 0 ? (0x10000 + value) : value;

        if (isLittleEndian) {
            this.buffer[this.curPos] = short & 0xFF;
            this.buffer[this.curPos + 1] = (short >> 8) & 0xFF;
        } else {
            this.buffer[this.curPos] = (short >> 8) & 0xFF;
            this.buffer[this.curPos + 1] = short & 0xFF; 
        }

        this.curPos += 2;
    }

        /** Writes an unsigned Int24
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
        public writeUInt24(value: number, isLittleEndian = this.isLittle): void {
            if (value < bTypes.UINT_MIN_VALUE || value > bTypes.UINT_MAX_VALUE)
                throw new RangeError(`Value (${value}) out of range for unsigned int24`);
    
            if (isLittleEndian) {
                this.buffer[this.curPos] = value & 0xFF;
                this.buffer[this.curPos + 1] = (value >> 8) & 0xFF;
                this.buffer[this.curPos + 2] = (value >> 16) & 0xFF;
            } else {
                this.buffer[this.curPos] = (value >> 16) & 0xFF;
                this.buffer[this.curPos + 1] = (value >> 8) & 0xFF;
                this.buffer[this.curPos + 2] = value & 0xFF;
            }
            
    
            this.curPos += 3;
        }
    
        /** Writes a signed Int24
         * @param value The value to write.
         * @param isLittleEndian Whether or not to write as Little Endian
         */
        public writeInt24(value: number, isLittleEndian = this.isLittle): void {
            if (value < bTypes.INT24_MIN_VALUE || value > bTypes.INT24_MAX_VALUE)
                throw new RangeError(`Value (${value}) out of range for signed int24`);
            
            if (value < 0) {
                value += 0x1000000;
            }

            if (isLittleEndian) {
                this.buffer[this.curPos] = value & 0xFF;
                this.buffer[this.curPos + 1] = (value >> 8) & 0xFF;
                this.buffer[this.curPos + 2] = (value >> 16) & 0xFF;
            } else {
                this.buffer[this.curPos] = (value >> 16) & 0xFF;
                this.buffer[this.curPos + 1] = (value >> 8) & 0xFF;
                this.buffer[this.curPos + 2] = value & 0xFF;
            }
            
    
            this.curPos += 3;
        }

    /** Writes an unsigned Int
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeUInt(value: number, isLittleEndian = this.isLittle): void {
        if (value < bTypes.UINT_MIN_VALUE || value > bTypes.UINT_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for unsigned int`);

        if (isLittleEndian) {
            this.buffer[this.curPos] = value & 0xFF;
            this.buffer[this.curPos + 1] = (value >> 8) & 0xFF;
            this.buffer[this.curPos + 2] = (value >> 16) & 0xFF;
            this.buffer[this.curPos + 3] = (value >> 24) & 0xFF;
        } else {
            this.buffer[this.curPos] = (value >> 24) & 0xFF;
            this.buffer[this.curPos + 1] = (value >> 16) & 0xFF;
            this.buffer[this.curPos + 2] = (value >> 8) & 0xFF;
            this.buffer[this.curPos + 3] = value & 0xFF;
        }

        this.curPos += 4;
    }

    /** Writes a signed Int
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeInt(value: number, isLittleEndian = this.isLittle): void {
        if (value < bTypes.INT_MIN_VALUE || value > bTypes.INT_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for signed int`);

        value = value & 0xFFFFFFFF;

        if (isLittleEndian) {
            this.buffer[this.curPos] = value & 0xFF;
            this.buffer[this.curPos + 1] = (value >> 8) & 0xFF;
            this.buffer[this.curPos + 2] = (value >> 16) & 0xFF;
            this.buffer[this.curPos + 3] = (value >> 24) & 0xFF;
        } else {
            this.buffer[this.curPos] = (value >> 24) & 0xFF;
            this.buffer[this.curPos + 1] = (value >> 16) & 0xFF;
            this.buffer[this.curPos + 2] = (value >> 8) & 0xFF;
            this.buffer[this.curPos + 3] = value & 0xFF;
        }

        this.curPos += 4;
    }

    /** Writes a signed Int40
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeInt40(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < BigInt(bTypes.INT40_MIN_VALUE) || value > BigInt(bTypes.INT40_MAX_VALUE)) {
            throw new RangeError(`Value (${value}) out of range for signed int40`);
        }
        
        if (value < BigInt(0)) {
            value += BigInt(0x10000000000);
        }

        if (isLittleEndian) {
            this.buffer[this.curPos] = Number(value & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(32)) & BigInt(0xFF));
        } else {
            this.buffer[this.curPos] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number(value & BigInt(0xFF));
        }

        this.curPos += 5; 
    }


    /** Writes an unsigned Int40
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeUInt40(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.UINT40_MIN_VALUE || value > bTypes.UINT40_MAX_VALUE) 
            throw new RangeError(`Value (${value}) out of range for unsigned int40`);

        if (isLittleEndian) {
            this.buffer[this.curPos] = Number(value & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(32)) & BigInt(0xFF));
        } else {
            this.buffer[this.curPos] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number(value & BigInt(0xFF));
        }

        this.curPos += 5;
    }

    /** Writes a signed Int48
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeInt48(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < BigInt(bTypes.INT48_MIN_VALUE) || value > BigInt(bTypes.INT48_MAX_VALUE)) {
            throw new RangeError(`Value (${value}) out of range for signed int48`);
        }
        
        if (value < BigInt(0)) {
            value += BigInt(0x1000000000000);
        }

        if (isLittleEndian) {
            this.buffer[this.curPos] = Number(value & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number((value >> BigInt(40)) & BigInt(0xFF));
        } else {
            this.buffer[this.curPos] = Number((value >> BigInt(40)) & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number(value & BigInt(0xFF));
        }

        this.curPos += 6; 
    }


    /** Writes an unsigned Int48
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeUInt48(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.UINT48_MIN_VALUE || value > bTypes.UINT48_MAX_VALUE) 
            throw new RangeError(`Value (${value}) out of range for unsigned int48`);

        if (isLittleEndian) {
            this.buffer[this.curPos] = Number(value & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number((value >> BigInt(40)) & BigInt(0xFF));
        } else {
            this.buffer[this.curPos] = Number((value >> BigInt(40)) & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number(value & BigInt(0xFF));
        }

        this.curPos += 6;
    }

    /** Writes a signed Int56
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeInt56(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < BigInt(bTypes.INT56_MIN_VALUE) || value > BigInt(bTypes.INT56_MAX_VALUE)) {
            throw new RangeError(`Value (${value}) out of range for signed int56`);
        }
        
        if (value < BigInt(0)) {
            value += 0x100000000000000n;
        }

        if (isLittleEndian) {
            this.buffer[this.curPos] = Number(value & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number((value >> BigInt(40)) & BigInt(0xFF));
            this.buffer[this.curPos + 6] = Number((value >> BigInt(48)) & BigInt(0xFF)); 
        } else {
            this.buffer[this.curPos] = Number((value >> BigInt(48)) & BigInt(0xFF)); 
            this.buffer[this.curPos + 1] = Number((value >> BigInt(40)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 6] = Number(value & BigInt(0xFF));
        }
        

        this.curPos += 7; 
    }


    /** Writes an unsigned Int56
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeUInt56(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.UINT56_MIN_VALUE || value > bTypes.UINT56_MAX_VALUE) 
            throw new RangeError(`Value (${value}) out of range for unsigned int56`);

        if (isLittleEndian) {
            this.buffer[this.curPos] = Number(value & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number((value >> BigInt(40)) & BigInt(0xFF));
            this.buffer[this.curPos + 6] = Number((value >> BigInt(48)) & BigInt(0xFF)); 
        } else {
            this.buffer[this.curPos] = Number((value >> BigInt(48)) & BigInt(0xFF));
            this.buffer[this.curPos + 1] = Number((value >> BigInt(40)) & BigInt(0xFF));
            this.buffer[this.curPos + 2] = Number((value >> BigInt(32)) & BigInt(0xFF));
            this.buffer[this.curPos + 3] = Number((value >> BigInt(24)) & BigInt(0xFF));
            this.buffer[this.curPos + 4] = Number((value >> BigInt(16)) & BigInt(0xFF));
            this.buffer[this.curPos + 5] = Number((value >> BigInt(8)) & BigInt(0xFF));
            this.buffer[this.curPos + 6] = Number(value & BigInt(0xFF));
        }

        this.curPos += 7;
    }

    /** Writes an unsigned Long
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeULong(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.ULONG_MIN_VALUE || value > bTypes.ULONG_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for an unsigned long`);

        if (isLittleEndian) {
            for (let i = 0; i < 8; i++) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        } else {
            for (let i = 7; i >= 0; i--) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        }

        this.curPos += 8;
    }

    /** Writes a signed Long
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeLong(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.LONG_MIN_VALUE || value > bTypes.LONG_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for a signed long`);

        if (value < 0n) {
            value = (1n << 64n) + value;
        }

        if (isLittleEndian) {
            for (let i = 0; i < 8; i++) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        } else {
            for (let i = 7; i >= 0; i--) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        }

        this.curPos += 8;
    }

    /** Writes a UInt128 (128-bit unsigned integer)
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeUInt128(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.UINT128_MIN_VALUE || value > bTypes.UINT128_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for an unsigned uint128`);

        if (isLittleEndian) {
            for (let i = 0; i < 16; i++) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        } else {
            for (let i = 15; i >= 0; i--) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        }

        this.curPos += 16;
    }

    /** Writes an Int128 (128-bit signed integer)
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeInt128(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.INT128_MIN_VALUE || value > bTypes.INT128_MAX_VALUE)
            throw new RangeError(`Value (${value}) out of range for an int128`);

        if (value < 0n) {
            value = (1n << 128n) + value;
        }

        if (isLittleEndian) {
            for (let i = 0; i < 16; i++) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        } else {
            for (let i = 15; i >= 0; i--) {
                this.buffer[this.curPos + i] = Number(value & 0xFFn);
                value >>= 8n;
            }
        }

        this.curPos += 16;
    }

    /** Writes a Float
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeFloat(value: number, isLittleEndian = this.isLittle): void {
        const float = new Float32Array(1);
        float[0] = value;
        const uint8Array = new Uint8Array(float.buffer);

        if (isLittleEndian) {
            for (let i = 0; i < 4; i++) {
                this.buffer[this.curPos + i] = uint8Array[i]!;
            }
        } else {
            for (let i = 3; i >= 0; i--) {
                this.buffer[this.curPos + (3 - i)] = uint8Array[i]!;
            }
        }

        this.curPos += 4;
    }


    /** Writes a Double
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeDouble(value: number, isLittleEndian = this.isLittle): void {
        const double = new Float64Array(1);
        double[0] = value;
        const uint8Array = new Uint8Array(double.buffer);

        if (isLittleEndian) {
            for (let i = 0; i < 8; i++) {
                this.buffer[this.curPos + i] = uint8Array[i]!;
            }
        } else {
            for (let i = 7; i >= 0; i--) {
                this.buffer[this.curPos + (7 - i)] = uint8Array[i]!;
            }
        }

        this.curPos += 8;
    }

    /**
     * Writes a UTF32 string
     * @param string The string to write
     * @param isLittleEndian Determines whether or not to write as Little Endian
     */
    public writeString32(string: string, isLittleEndian = this.isLittle, writeLength = false) {
        if (writeLength)
            this.writeUShort(string.length * 4);

        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            
            if (char >= 0xD800 && char <= 0xDBFF) {
                const high = char;
                const low = string.charCodeAt(++i);
                
                const codePoint = ((high - 0xD800) << 10) + (low - 0xDC00) + 0x10000;
                this.writeUInt(codePoint, isLittleEndian); 
            } else {
                this.writeUInt(char, isLittleEndian);
            }
        }
    }

    /** Writes a UTF16 string
     * @param string The string to write
     * @param isLittleEndian Determines whether or not to write as Little Endian
     */
    public writeString16(string: string, isLittleEndian = this.isLittle, writeLength = false) {
        if (writeLength)
            this.writeUShort(string.length * 2);

        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            
            if (char >= 0xD800 && char <= 0xDBFF) {
                const high = char;
                const low = string.charCodeAt(++i);
                
                const codePoint = ((high - 0xD800) << 10) + (low - 0xDC00) + 0x10000;
                this.writeUShort((codePoint >> 10) + 0xD800, isLittleEndian);
                this.writeUShort((codePoint & 0x3FF) + 0xDC00, isLittleEndian); 
            } else {
                this.writeUShort(char, isLittleEndian);
            }
        }
    }
    
    /** Writes a UTF-8 string
     * @param string The string to write
     * @param nullTerminate Determines whether to append a null byte to the end of the string
     */
    public writeString8(string: string, writeLength = false, nullTerminate: boolean = false) {
        const str = new TextEncoder().encode(string);

        if (writeLength)
            this.writeUShort(str.byteLength);

        str.forEach((byte) => {
            this.writeByte(byte);
        });

        if (nullTerminate)
            this.writeByte(0); 
    }

}