import { add } from 'lodash';

AV.init({ 
  appId: "5Y6XfcEGs057U6eBhhYiIBy0-MdYXbMMI",
  appKey: "QIt08R1MMkbnQuFO7TPtR6up",
  serverURL: "https://5y6xfceg.api.lncldglobal.com"
});

const AV = require('leancloud-storage');
const { Query, User } = AV;


const Tag = AV.Object.extend('Tag');
const Post = AV.Object.extend('Post');
const Fiction = AV.Object.extend('Fiction');
const Chapter = AV.Object.extend('Chapter');
const Message = AV.Object.extend('Message');
const Ad = AV.Object.extend('Ad');

export async function addTag({title="xxx",icon=""}) {
  const tag = new Tag()
  tag.set('title', title)
  return tag.save()
}

try {
  const tag = await addTag({title: '',icon: ''})

} catch (error) {
  
}


  // 注册子类
  AV.Object.register(Tag);

// class Post extends AV.Status {
//     // self-defined attributes and methods
//     super () {
//       this.tid = []
//       this.uid = 0
//       this.edited = ''
//       this.deleted = false
//       this.title = ''
//       this.content = ''
//       this.post_count = 0
//       this.editor = ''
//       this.upvotes = 0
//       this.downvotes = 0
//     }
//   }
  
//   // 注册子类
//   AV.Object.register(Post);

// class Fiction extends AV.Object {
//     // self-defined attributes and methods
//     super () {
//       this.fid = 0
//       this.tid = 0
//       this.edited = ''
//       this.deleted = false
//       this.title = ''
//       this.content = '' // TODO: in chapter or fiction ? 
//       this.editor = [] // TODO: use array or other way of representations
//     }
//   }
  
//   // 注册子类
//   AV.Object.register(Fiction);

// class Chapter extends AV.Object {
//     // self-defined attributes and methods
//     super () {
//       this.cid = 0
//       this.fid = 0
//       this.edited = ''
//       this.deleted = false
//       this.title = ''
//       this.content = '' // TODO: in chapter or fiction ? 
//       this.editor = [] // TODO: use array or other way of representations
//     }
//   }
  
//   // 注册子类
//   AV.Object.register(Chapter);

// class Ad extends AV.Object {
//     // self-defined attributes and methods
//     super () {
//       this.aid = 0
//       this.imgURL = ''
//       this.link = ''
//       this.deleted = false
//     }
//   }
  
//   // 注册子类
//   AV.Object.register(Ad);