import RemoveBtn from '@/components/RemoveBtn';
import Link from 'next/link';
import { ObjectId } from 'mongoose';
import { HiPencilAlt } from 'react-icons/hi';

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache:'no-store',
    });

    if(!res.ok) {
      throw new Error("failed to fetch topics");
    }
    console.log('fetched topics');

    return res.json();

  } catch(error) {
    console.log('error loading topics: ', error);
  }
}

export default async function TopicsList() {
  const topics = await getTopics();

  return(
    <>
      {topics.map((t: {_id: ObjectId, title: string, description: string}) => (
        <div className='p-4 border border-slate-300 my-3 flex justify-between items-start'>
          <div>
            <h2 className='font-bold text-2xl'>{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className='flex gap-2'>
            <RemoveBtn/>
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size='24'/>
            </Link>
          </div>
        </div>    
      ))}
    </>
  )
}
