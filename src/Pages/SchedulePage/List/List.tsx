import React, { FC, useEffect } from "react";
import { DayCard } from "src/Components/DayCard/DayCard";
import { useScroll } from "src/Hooks/useScroll";
import { useAppSelector } from "src/State/hooks";
import { DayT } from "src/Types/GroupScheduleTypes";
import { dayTeacher } from 'src/Types/TeacherScheduleTypes';
import { TeacherDayCard } from 'src/Components/TeacherSchedule/TeacherDayCard';
interface ListI {
  groupSchedule?: DayT[] | undefined;
  teacherSchedule?: dayTeacher[] | undefined;
  listType: 'teacher' | 'group'
}
export const List: React.FC<ListI> = ({ groupSchedule, teacherSchedule, listType }) => {
  const curDayIndex = useAppSelector((state) => state.scheduleSettings.curDay);
  let elRefs: any[] = [];
  elRefs[0] = useScroll();
  elRefs[1] = useScroll();
  elRefs[2] = useScroll();
  elRefs[3] = useScroll();
  elRefs[4] = useScroll();
  elRefs[5] = useScroll();

  useEffect(() => {
    elRefs.map((el, index) => {
      if (el[1].current !== null && index === curDayIndex) el[0]();
    });
  }, [elRefs, curDayIndex]); // Runs after component mounts
  
  if (listType === 'teacher') {
    return (
      <div>
        {teacherSchedule?.map((day, index) => (
          <div
            key={`${day.lessons} + ${index}`}
            style={+day.dayOfWeek !== 5 ? { marginBottom: "10px" } : {}}
            ref={elRefs[day.dayOfWeek][1]}
          >
            <TeacherDayCard key={(`${day.lessons} +${index}`)}
              dayOfWeek={day.dayOfWeek}
              lessons={day.lessons}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {groupSchedule?.map((day, index) => (
        <div
          key={`${day.lessons} + ${index}`}
          style={+day.dayOfWeek !== 5 ? { marginBottom: "10px" } : {}}
          ref={elRefs[day.dayOfWeek][1]}
        >
          <DayCard
            dayOfWeek={day.dayOfWeek}
            isWeekend={day.isWeekend}
            lessons={day.lessons}
          />
        </div>
      ))}
    </div>
  );
};
