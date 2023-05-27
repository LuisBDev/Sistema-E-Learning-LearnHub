export const register = (req, res) => 
{
    console.log(req.body);
    res.send('Registrando usuario desde controller');
}