module.exports = {
    encodeWav,
    decodeWav
}

/**
 * @param rawPCM buffer
 * @param options.numChannels
 * @param options.sampleRate 
 * @param options.byteRate
 * @return Buffer
 * @throws Exception
 */
function encodeWav(rawPCM, options) {
    if (!Buffer.isBuffer(rawPCM)) {
        throw new TypeError('pcm data must be Buffer')
    }
    const opt = options || {}
    const sampleRate = opt.sampleRate || 16000
    const numChannels = opt.numChannels || 1
    const byteRate = opt.byteRate || 16

    // const buf = Buffer.from(rawPCM, 'binary')
    const buf = rawPCM
    const header = new Buffer.alloc(44)

    header.write('RIFF', 0)
    header.writeUInt32LE(buf.length, 4)
    header.write('WAVE', 8)
    header.write('fmt ', 12)
    header.writeUInt8(16, 16)
    header.writeUInt8(1, 20)
    header.writeUInt8(numChannels, 22)
    header.writeUInt32LE(sampleRate, 24)
    header.writeUInt32LE(byteRate, 28)
    header.writeUInt8(4, 32)
    header.writeUInt8(16, 34)
    header.write('data', 36)
    header.writeUInt32LE(buf.length + 44 - 8, 40)

    return Buffer.concat([header, buf])
}


function decodeWav(rawWav, options) {
    if (typeof rawWav !== 'string') {
        throw new TypeError('wav data must be binary string')
    }
    return
}