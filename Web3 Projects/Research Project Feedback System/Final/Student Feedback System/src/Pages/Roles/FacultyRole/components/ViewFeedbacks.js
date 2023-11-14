import React, { useContext, useEffect, useState } from 'react'
import {VscPreview} from 'react-icons/vsc';
import { FeedbackContext } from '../../../Context/Context';
import ViewFeedbackPage from '../../AdminRole/components/ViewFeedbackPage';
const {ethereum} = window;

const ViewFacultyFeedbacks = () => {
  const {getFacultyCourses, facultyCourses, isClicked, setIsClicked, createEthereumContract, feedbackByCourseCode,setFeedbackByCourseCode} = useContext(FeedbackContext);
  const [courseCode, setCourseCode] = useState("");
  const openFeedback = async(courseCode) => { //get feedback by coursecode
    console.log("clicked")
    setIsClicked(true);
    setCourseCode(courseCode);
    console.log("courseCode: ",courseCode);
    try {
      if(ethereum){
        const transactionsContract = createEthereumContract();
        const feedbacks = await transactionsContract.getFeedbackByAddress(courseCode);
        setFeedbackByCourseCode(feedbacks);
        console.log("feedbacks: ",feedbacks);
        console.log(feedbackByCourseCode);
      } else{
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }
  useEffect(()=>{
    getFacultyCourses();
},[])
  return (
    <div className='bg-[#F5F5F5] min-h-screen rounded-b-3xl'>
        
        <p className='text-white text-2xl mb-10 font-bold bg-[#039BE5] h-24 flex items-center rounded-t-xl'><VscPreview className='ml-5 mr-3 w-6 h-6'/>View Feedbacks</p>
        <div>
       <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex justify-center">
      <div
        class="inline-block w-3/4 shadow-md rounded-lg overflow-hidden"
      >
        <table class=" w-full leading-normal">
          <thead>
            <tr>
              <th
                class="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Name
              </th>
              <th
                class="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Course Code
              </th>
              <th
                class=" text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Course Title
              </th>
              <th
                class=" text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
                facultyCourses?.map(course => <tr>
                     <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center justify-center">
                  <div class="flex-shrink-0 w-10 h-10">
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                     {course?.facultyName}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <p class="text-gray-900 whitespace-no-wrap">{course?.courseCode}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <p class="text-gray-900 whitespace-no-wrap">{course?.courseTitle}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
              <button className='btn font-semibold leading-tight rounded-full bg-red-200 text-red-900 px-4 py-2 ' onClick={()=>{openFeedback(course?.courseCode)}}>View Feedbacks</button>
              </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
{
        isClicked && <ViewFeedbackPage feedbackByCourseCode={feedbackByCourseCode}></ViewFeedbackPage>
    }
       </div>
    </div>
  )
}

export default ViewFacultyFeedbacks;