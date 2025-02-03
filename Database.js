const mongoose = require('mongoose');
const { Schema } = mongoose;


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mongooseTutorial');
  console.log("succesfully Connected")
}

//Populate
const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  });

  const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  });
  
// The ref option is what tells Mongoose which model to use during population, in our case the Story model. All _ids we store here must be document _ids from the Story model.

  const Story = mongoose.model('Story', storySchema);
  const Person = mongoose.model('Person', personSchema);

  const save=async()=>{
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
      });

      await author.save();
  
      const story1 = new Story({
        title: 'SAnchit Jain',
        author: author._id // assign the _id from the person
      });
      
      await story1.save();
  }
  const populate=async()=>{
    const story = await Story.
  findOne({ title: 'SAnchit Jain' }).
  populate('author').
  exec();
// prints "The author is Ian Fleming"
console.log('The author is %s', story.author.name);
  }
  save()
  populate()

  