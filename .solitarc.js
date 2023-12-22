const path = require('path');
const programDir = path.join(__dirname, "programs/account-manager")//'..', 'program');
const idlDir = path.join(__dirname, 'idl');
const sdkDir = path.join(__dirname, 'src', 'generated');
const binaryInstallDir = path.join(__dirname, '.crates');

module.exports = {
    idlGenerator: 'anchor',
    programName: 'account-manager',
    programId: '4ghb7LAzcmr5PYNkz2tgyEsPHB7Q7vHtiRfLDiFNoDj6',
    idlDir,
    sdkDir,
    binaryInstallDir,
    programDir,
};