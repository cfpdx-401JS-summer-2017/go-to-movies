function countSmileys(arr) {

    let length = arr.length;
    let faceCount = [];
    if (length === 0) return 0;

    function face(str) {
        let chars = str.split('').map(char);
        console.log(chars);
        if (((chars[0] === ':' || chars[0] === ';') &&
            (chars[1] === ')' || chars[0] === 'D'))
            ||
            ((chars[0] === ':' || chars[0] === ';') &&
                (chars[1] === '-' || chars[1] === '~') &&
                (chars[2] === ')' || chars[2] === 'D'))) {
            return faceCount.push(str);
        };
    };

    for (let i = 0; i < length; i++) {
        face(arr[i])
    };

    return faceCount.length;
}

countSmileys([':D)', ';)', ':D']);