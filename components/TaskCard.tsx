import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Task, TASK_STATUS } from "@prisma/client";

import Button from "./Button";
import Card from "./Card";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  tasks: Task[];
}

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};

export default async function TaskCard({ title, tasks }: IProps) {
  const data = tasks || (await getData());

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2 " key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No tasks</div>
        )}
      </div>
    </Card>
  );
}
