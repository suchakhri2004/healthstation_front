import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import AdminNavbar from "../../../components/navbarAdmin/adminNavbar";
import AdminSidebar from "../../../components/navbarAdmin/adminSidebar";
import { Link } from "react-router-dom";
import icon from "../../../assets/icon.png";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
// Other imports

interface ProfileData {
  id: number;
    ssd: string;
    firstname: string;
    lastname: string;
    sex: string;
    age: number;
    birthday_date: string;
    num_of_house: string;
    group_of_house: string;
    alley_of_house: string;
    tambon: string;
    amphoe:string;
    province: string;
    postcode: number;
    phone: number;
    line_id: string;
    email: string;
    education_level: string;
    career: string;
    caregiver: string;
    operating_area: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString); // แปลง string เป็น Date object
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() + 543).toString(); // แปลงปี ค.ศ. เป็น พ.ศ.
  return `${day}/${month}/${year}`; // คืนค่าตามรูปแบบที่ต้องการ
};


const ShowInformation: React.FC = ({}) => {
  const [state, setState] = useState();
  const [personalData, setPersonalData] = useState<ProfileData[] | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [userId, setUserId] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { cid } = useParams<{ cid: string }>();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/api/users/getCaregivenFromId/${cid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPersonalData(response.data);
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [cid]);

  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="flex">
        <div className="grid-rows-1">
          <AdminSidebar />
        </div>
        <div className=" bg-neutral-100 w-full">
          <div className="flex-initial md:bg-white"></div>
          <div className="flex-1 md:bg-neutral-100 ">
            <div className=" md:bg-white md:m-4 p-2 bg-white rounded-lg">
              <div className="text-center rounded-md">
                <div className=" ">
                  <div className="flex p-4 ">
                    <Link to="/admin/caregiverInformation">
                      <button className="mr-2 ">
                        <img
                          src={icon}
                          alt="icon"
                          className="object-cover h-3 mt-3 mr-1 md:place-items-start"
                        />
                      </button>
                    </Link>
                    <div className="text-2xl">ข้อมูลผู้ดูแล</div>
                  </div>
                  <div className="m-2 mt-4">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            
                            <div className="">
                                <div className="text-start p-4">ข้อมูลส่วนบุคคล</div>
                                {personalData && personalData.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-x-4">
                                    <TableCell className="">
                                      <div className="grid grid-cols-2">
                                        <div>เลขบัตรประชาชน</div>
                                        <div>{personalData[0].ssd}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>ชื่อ</div>
                                        <div>{personalData[0].firstname}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>นามสกุล</div>
                                        <div>{personalData[0].lastname}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>เพศ</div>
                                        <div>{personalData[0].sex}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>อายุ</div>
                                        <div>{personalData[0].age}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>วันเดือนปีเกิด</div>
                                        <div>
                                        {formatDate(personalData[0].birthday_date)}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>ที่อยู่</div>
                                        <div>
                                          {personalData[0].num_of_house}
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="">
                                      <div className="grid grid-cols-2">
                                        <div>เบอร์โทรศัพท์</div>
                                        <div>{personalData[0].phone}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>Line ID</div>
                                        <div>{personalData[0].line_id}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>E-mail</div>
                                        <div>{personalData[0].email}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>ระดับการศึกษา</div>
                                        <div>{personalData[0].education_level}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>อาชีพ</div>
                                        <div>{personalData[0].career}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>การอบรม Cg</div>
                                        <div>{personalData[0].caregiver}</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                        <div>พื้นที่ปฏิบัติงาน</div>
                                        <div>{personalData[0].operating_area}</div>
                                      </div>
                                    </TableCell>
                                  </div>
                                ) : (
                                  <div>
                                    <p>
                                      ไม่มีข้อมูลของตารางประวัติข้อมูลสุขภาพ
                                    </p>
                                    <p>{userId}</p>
                                  </div>
                                )}
                             </div>
                          </TableRow>
                        </TableHead>
                        <TableBody></TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInformation;
