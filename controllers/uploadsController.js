const { StatusCodes } = require('http-status-codes')

const path = require('path')
const CustomError = require('../errors')


const uploadProductImage = async (req, res) => {

    // check if file exists
    if (!req.files) {
        throw new CustomError.BadRequestError('No file Uploaded')
    }

    let productImage = req.files.image

    // check format
    if (!productImage.minetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload Image')
    }

    // check size
    const maxSize = 1024 * 1024
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError(`Please upload image smaller ${maxSize}`)
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)

    await productImage.mv(imagePath)

    res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}})
}


module.exports = {
    uploadProductImage
}