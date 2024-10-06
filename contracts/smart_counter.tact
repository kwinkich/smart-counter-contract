import "@stdlib/deploy";

contract SmartCounter with Deployable {
    id: Int as uint32;
    count: Int as uint32;

    init(id: Int) {
        self.id = id;
        self.count = 0;
    }

    receive() {

        self.count = self.count + context().value; // Get thx value

        let finalStr: StringBuilder = beginString(); // Create var for the final string

        let countString: String =  self.count.toCoinsString(); // var for the string of the current count value

        finalStr.append(countString); // Append value
        finalStr.append(" ton"); // Append " ton"
        
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue | SendIgnoreErrors,
            body: finalStr.toString().asComment(),
        }); // Send return thx
    }

    get fun counter(): Int {
        return self.count;
    }
}
