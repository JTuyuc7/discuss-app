import Link from "next/link";
import { Chip } from "@nextui-org/chip"
import { db } from "@/db";
import paths from '@/paths'

export default async function TopicList() { 
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => { 
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          
            <Chip color="warning" variant="shadow">{topic.slug}</Chip>
          
        </Link>
      </div>
    )
  })

  return (
    <div className="flex flex-grow gap-2 mt-3 flex-wrap">
      {renderedTopics}
    </div>
  );
}