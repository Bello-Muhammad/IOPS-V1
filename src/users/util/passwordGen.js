const passwordGen = async () => {
    let lenght = 8;
    let result = '';
    const charToUse = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    //LOOP to generate password at random
    for (let i = 0; i < lenght; i++) {
        const randomInd = Math.floor(Math.random()*charToUse.length);

        result += charToUse.charAt(randomInd);
    }

    return result;
}

module.exports = passwordGen;