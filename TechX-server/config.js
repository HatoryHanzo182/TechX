import crypto from 'crypto';
import fs from 'fs/promises';

let _config;

try 
{
    const config_data = fs.readFileSync('config.json', 'utf8');
    
    _config = JSON.parse(config_data);
} 
catch (err) 
{
    _config = { token_secret_key: crypto.randomBytes(32).toString('base64') };
    
    await fs.writeFile('config.json', JSON.stringify(_config), 'utf8');
}

export default _config;