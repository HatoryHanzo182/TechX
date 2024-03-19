import crypto from 'crypto';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let _config_token;
const _token_path = path.join(__dirname, '../ServerData/token_key.json');

try 
{
    const config_data = await fs.readFile(_token_path, 'utf8');

    _config_token = JSON.parse(config_data);
} 
catch (err) 
{
    _config_token = { token_secret_key: crypto.randomBytes(32).toString('base64') };
    
    await fs.writeFile(_token_path, JSON.stringify(_config_token), 'utf8');
}

export default _config_token;