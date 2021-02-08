class Post{
  constructor(title){
    this.title = title
    this.date= new Date()
  }
  toString(){
    JSON.stringify(value:{
      title: this.title,
      date: this.date.toJSON()
    })
  }
}