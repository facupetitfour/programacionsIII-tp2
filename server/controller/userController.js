class UserController {
  async handleGetAllItems(req,res){
    try {
      res.status(200).json({msg:"Get all items"})
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async handleGetItem(req,res){
    try {
      res.status(200).json({msg:"Get item"})
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async handleCreateItem(req,res){
    try {
      res.status(200).json({msg:"Create item"})
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async handleDeleteItem(req,res){
    try {
      res.status(200).json({msg:"Delete item"})
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async handleUpdateItem(req,res){
    try {
      res.status(200).json({msg:"Update items"})
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
export default UserController