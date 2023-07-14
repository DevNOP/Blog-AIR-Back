class ReadPostService {
  execute() {
    return [
      {
        title: 'Hello World',
        content: 'Hello World',
        author: 'Hello World',
        date: 'Hello World',
      },
    ]
  }
}

export default new ReadPostService()
