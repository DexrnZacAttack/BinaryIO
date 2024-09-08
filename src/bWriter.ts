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
            throw new Error('Value out of range for unsigned byte');

        this.buffer[this.curPos++] = value;
    }

    /** Writes a signed Byte
     * @param value The value to write.
    */
    public writeSByte(value: number): void {
        if (value < bTypes.SBYTE_MIN_VALUE || value > bTypes.SBYTE_MAX_VALUE)
            throw new Error('Value out of range for signed byte');

        this.buffer[this.curPos++] = (value & 0xFF);
    }

    /** Writes an unsigned Short
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
    */
    public writeUShort(value: number, isLittleEndian = this.isLittle): void {
        if (value < bTypes.USHORT_MIN_VALUE || value > bTypes.USHORT_MAX_VALUE)
            throw new RangeError('Value out of range for unsigned short');

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
            throw new RangeError('Value out of range for signed short');

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
                throw new RangeError('Value out of range for unsigned int24');
    
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
                throw new RangeError('Value out of range for signed int24');
            
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
            throw new RangeError('Value out of range for unsigned int');

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
            throw new RangeError('Value out of range for signed int');

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


    /** Writes an unsigned Long
     * @param value The value to write.
     * @param isLittleEndian Whether or not to write as Little Endian
     */
    public writeULong(value: bigint, isLittleEndian = this.isLittle): void {
        if (value < bTypes.ULONG_MIN_VALUE || value > bTypes.ULONG_MAX_VALUE)
            throw new RangeError('Value out of range for an unsigned long');

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
            throw new RangeError('Value out of range for a signed long');

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

    /** Writes a UTF16 string
     * @param string The string to write
     * @param isLittleEndian Whether or not to write as Little Endian
    */
    public writeString16(string: string, isLittleEndian = this.isLittle) {
        ([...string]).forEach((char) => {
                this.writeShort((char.charCodeAt(0)), isLittleEndian);
        });
    }

    /** Writes a UTF8 string
     * @param string The string to write
     * @param isNullTerminated Determines whether to append a null byte to the end of the string
    */
    public writeString8(string: string, isNullTerminated: boolean = false) {
        ([...string]).forEach((char) => {
                this.writeByte(char.charCodeAt(0));
        });
        if (isNullTerminated) {
            this.writeByte(0);
        }
    }

}