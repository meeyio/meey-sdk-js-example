import { MeeyClient, GrpcWebProvider } from '@meey-sdk-js/client';
const meey = new MeeyClient({}, new GrpcWebProvider({url: 'http://192.168.6.252:7845'}));

document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML += '<style>body {white-space: pre}</style>';
    document.body.innerHTML += "BLockId    BlockHash\n";
    
    meey.getBlockMetadataStream().on('data', (blockMetadata) => {
        const ts = new Date(blockMetadata.header.timestamp / 1000000);
        document.body.innerHTML += `${blockMetadata.header.blockno}      ${blockMetadata.hash}    ${ts}\n`;
    });
});
