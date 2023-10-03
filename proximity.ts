//% color="#000000"
//% block="Proximity"
//% icon="\uf06e"
namespace proximity {
    const rssThreshold = -90    // Recieved strength that is "close"
    const timeThreshold = 1000  // Time before microbit is considered "far" 
    const period = 250          // 250ms = ~ 4x per second
    const radioGroup = 25       // Arbitrary / try to avoid collisions
    const transmitPower = 0     // 0-7
    const magicNumber = -1274   // Number indicating proximity message

    let nearHandler: (name: string, rss: number) => void = null

    // Map of microbit serial number : last detection time
    let who: any = {}  

    forever(() => {
        //radio.setTransmitSerialNumber(true)
        radio.setTransmitPower(transmitPower)
        radio.setGroup(radioGroup)  
        radio.sendValue(control.deviceName(), magicNumber) 
        basic.pause(period)    
    })

    radio.onReceivedValue(function (name, value) { 
        // Only check for proximity if the message was the magic number
        if (value != magicNumber) {
            return
        }
        const now = control.millis()
        // Get stored value. If null, first detection & set last to far enough in the past
        const rss = radio.receivedPacket(RadioPacketProperty.SignalStrength)

        const storedValue = who[name]
        const lastRecievedTime = storedValue ? storedValue : (now - timeThreshold - 1)
        serial.writeLine("stored = " + storedValue)
        serial.writeLine("lRT = " + lastRecievedTime)

        // Debugging / testing
        serial.writeValue(name, rss)

        // If "close enough" and "new enough detection"
        if (rss >= rssThreshold) {
            who[name] = now

            if((now - lastRecievedTime) >= timeThreshold) {
                // Proximity detected:  Trigger event handler
                if(nearHandler) {
                    nearHandler(name, rss)
                }
            }
        }
    });

    /**
     *  Respond to a microbit being detected
     */
    //% blockId=onMicrobitDetected block="on near microbit $name and $signalStrength"
    //% draggableParameters
    export function onMicrobitDetected(handler: (name:string, signalStrength: number) => void) {
        nearHandler = handler
    }
}
