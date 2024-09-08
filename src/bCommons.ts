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

export class bCommons {
    protected buffer: Uint8Array;
    protected isLittle: boolean;
    protected curPos: number;

    constructor(buffer: Uint8Array | ArrayBuffer | DataView, isLittle: boolean = false, curPos = 0) {
        this.buffer = buffer instanceof ArrayBuffer
            ? new Uint8Array(buffer)
        : buffer instanceof DataView
            ? new Uint8Array(buffer.buffer)
        : buffer;
        this.isLittle = isLittle;
        this.curPos = curPos;
    }

    /** Creates a new array with the chosen size with offset 0 being the chosen offset provided 
     * @param size New size
     * @param offset Copies the data starting from this offset
     * @param preservePos Don't change the position when resizing
     * @warning Turning on preservePos can be unsafe, specifically when making the buffer smaller, as the pointer can go out of bounds.
    */
    public setBufferSize(size: number, offset = 0, preservePos = false) {
        if (offset > this.byteLength) {
            throw new Error('Offset is greater than the current length of the buffer.');
        }

        const newBuffer = new Uint8Array(size);
        newBuffer.set(this.buffer.slice(offset, this.byteLength));
        this.buffer = newBuffer;

        if (!preservePos)
            this.curPos = Math.max(0, this.curPos - offset);
    } 

    /** Returns the ArrayBuffer of the entire stream. */
    public get arrayBuffer(): ArrayBuffer {
        return this.buffer.buffer;
    }

    /** Equivalent to ArrayBuffer.byteLength */
    public get byteLength(): number {
        return this.buffer.length;
    }

    /** Equivalent to ArrayBuffer.slice
     * @param start Where to begin
     * @param end Where to end
    */
    public slice(start: number, end?: number): ArrayBuffer {
        return this.buffer.slice(start, end);
    }

    /** Increments the position in the stream
     * @param num How much to increment the position
    */
    public incrementPos(num: number): void {
        this.curPos += num;
    }

    /** Decrements the position in the stream
     * @param num How much to decrement the position
    */
    public decrementPos(num: number): void {
        this.curPos -= num;
    }

    /** Sets the position in the string
     * @param num What position to be at
    */
    public setPos(num: number): void {
        this.curPos = num;
    }

    /** Returns the current position in the stream */
    public get pos(): number {
        return this.curPos;
    }

    /** Sets the endianness
     * @param isLittleEndian If true, it gets set to Little Endian.
    */
    public setEndianness(isLittleEndian: boolean): void {
        this.isLittle = isLittleEndian;
    }

    /** Returns the endianness as a boolean to signify whether or not it is little endian. */
    public get getEndianness(): boolean {
        return this.isLittle;
    }
}