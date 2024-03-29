function uploadRoute (dependencies: any) {
  const _controllers = dependencies.controllers
  const _utilities = dependencies.utilities

  const upload = async (req: any, res: any) => {
    const response = await _controllers.upload.uploadFile(req, res)

    res.json(response)
  }

  const bulk = async (req: any, res: any) => {
    try {
      const response = await _controllers.upload.bulk(req, res)

      res.json(response)
    } catch (error) {
      res.json(_utilities.response.error(error.message))
    }
  }

  return {
    upload,
    bulk
  }
}

module.exports = uploadRoute
