export default class AudioContext {
    constructor(){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.audioSource = this.audioContext.createBufferSource();
        this.audioBuffer = null
        this.file = null
        this.interval = null
        this.currentTime = 0
        this.audioDuration = 0
        this.isPlaying = false
        this.volume = 1
        this.playback = 0

        this.audioGain = this.audioContext.createGain();
        this.reverbGain = this.audioContext.createGain();
        this.audioGain.gain.value = 1
        this.reverbGain.gain.value = 0
        this.audioGainInitial = this.audioGain.gain.value
        this.reverbGainInitial = this.reverbGain.gain.value
        this.convolver = null

        this.lowPassFilter = this.audioContext.createBiquadFilter();
        this.lowPassFilter.type = 'lowpass';
        this.lowPassFilter.frequency.value = 20000
        this.lowShelfFilter = this.audioContext.createBiquadFilter();
        this.lowShelfFilter.type = 'lowshelf';
        this.lowShelfFilter.frequency.value = 400
        this.lowShelfFilter.gain.value = -30
        this.compressor = this.audioContext.createDynamicsCompressor()
        this.compressor.threshold.value = -30;
        this.compressor.ratio.value = 8;
        this.midAttenuation = this.audioContext.createBiquadFilter();
        this.midAttenuation.type = 'peaking';
        this.midAttenuation.frequency.value = 1000;
    }

    setInterval(startAt){
        if (this.interval){
            clearInterval(this.interval)
            this.stop()
        }

        this.currentTime = startAt
        this.interval = setInterval(()=>{
            this.currentTime = this.currentTime + (this.playback + 1.0)
            console.log(this.currentTime + (this.playback + 1.0))
            if (this.currentTime >= this.audioDuration){
                clearInterval(this.interval)
                this.interval = null
                this.currentTime = startAt
                //
                if (this.loop){
                    this.play()
                }
            }
        }, 1000)
    }

    getArrayBuffer(track){
        if (this.currentTime > 0){
            clearInterval(this.interval)
        }

        fetch(track)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            console.log("Loading...")
            console.log(buffer)
            return this.audioContext.decodeAudioData(buffer)
        })
        .then(audioBuffer => {
            this.audioBuffer = audioBuffer
            this.currentTime = 0
            this.audioDuration = this.audioBuffer.duration
        })
        .catch(err => console.error("Error :", err))
    }

    play(startAt = 0){
        if (this.isPlaying){
            this.audioSource.stop()
        }
        this.setInterval(startAt)

        let audioSource = this.audioContext.createBufferSource()
        audioSource.buffer = this.audioBuffer
        audioSource.connect(this.lowPassFilter)
        this.lowPassFilter.connect(this.audioGain)
        this.audioGain.connect(this.audioContext.destination)

        this.setConvolver(audioSource);

        audioSource.start(0, this.currentTime);
        audioSource.playbackRate.value = this.audioSource.playbackRate.value;
        
        this.audioSource = audioSource
        
        this.isPlaying = true
    }

    stop(){
        if (!this.audioSource){
            return
        }

        clearInterval(this.interval)
        this.audioSource.stop()
        this.isPlaying = false
    }

    setVolume(value) {
        this.volume = value;
        this.reverbGain.gain.value = this.reverbGainInitial * value;
        this.audioGain.gain.value = this.audioGainInitial * value;
    }

    setConvolver(audioSource){
        if (this.convolver){
            return
        }
        const impulse = "./../GraffitiHallway.wav"
        console.log(`Fetching: ${impulse}`)
        fetch(impulse)
        .then(res => {
            console.log(res)
            return res
        })
        .then(response => response.arrayBuffer())
        .then(impulseResponseData => this.audioContext.decodeAudioData(impulseResponseData))
        .then(decodedImpulseResponse => {
            this.convolver = this.audioContext.createConvolver();
            this.convolver.buffer = decodedImpulseResponse;

            audioSource.connect(this.lowPassFilter);
            this.lowPassFilter.connect(this.lowShelfFilter);
            this.lowShelfFilter.connect(this.convolver);
            this.convolver.connect(this.reverbGain);
            this.reverbGain.connect(this.compressor);
            this.compressor.connect(this.audioContext.destination);
        })
    }

    setReverb(value){
        this.reverbGain.gain.value = value * this.volume;
        this.audioGain.gain.value = (1 - value) * this.volume;
        //
        this.reverbGainInitial = value
        this.audioGainInitial = 1 - value
    }

    setPitch(value){
        this.audioSource.playbackRate.value = value
        this.playback = value - 1
    }

    setLowpass(value){
        console.log(value)
        if (value > 20000){
            value = 20000
        } else if (value < 1){
            value = 1
        }
        this.lowPassFilter.frequency.value = 20000 / value;
    }

    setLoop(loop){
        this.loop = loop
    }
}