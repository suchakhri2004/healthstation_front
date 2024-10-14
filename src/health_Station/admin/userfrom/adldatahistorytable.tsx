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

// ประกาศ Interface ของข้อมูล Profile
interface ProfileData {
  time_stamp: number; // ใช้ number เนื่องจากเป็น Unix timestamp
  adl_point: number;
}

// ฟังก์ชันแปลง Unix timestamp เป็น dd/MM/yyyy
const formatDate = (isoDate: number): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = (date.getUTCFullYear() + 543).toString(); // แปลงปี ค.ศ. เป็น พ.ศ.
  return `${day}/${month}/${year}`;
};

const Adldatahistorytable: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData[] | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState<string | null>(null);
  const { aid } = useParams<{ aid: string }>();

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/api/users/getDataAdlFromId/${aid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfileData(response.data);
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [aid]);

  return (
    <div className="h-screen">
      <AdminNavbar />
      <div className="flex">
        <div className="grid-rows-1">
          <AdminSidebar />
        </div>
        <div className="bg-neutral-100 w-full">
          <div className="flex-initial md:bg-white"></div>
          <div className="flex-1 md:bg-neutral-100 ">
            <div className="md:bg-white md:m-4 p-2 bg-white rounded-lg">
              <div className="text-center rounded-md">
                <div className="">
                  <div className="flex p-4 ">
                    <Link to="/admin">
                      <button className="mr-2 ">
                        <img
                          src={icon}
                          alt="icon"
                          className="object-cover h-3 mt-3 mr-1 md:place-items-start"
                        />
                      </button>
                    </Link>
                    <div className="text-2xl">ข้อมูล ADL</div>
                  </div>
                  <div className="m-2 mt-4">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="text-center">
                              วันที่
                            </TableCell>
                            <TableCell>
                              <div className="text-end">คะแนนการประเมินกิจวัตรประจำวัน</div>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {profileData && profileData.length > 0 ? (
                            profileData.map((data, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {formatDate(data.time_stamp)}
                                </TableCell>
                                <TableCell>
                                  <div className="text-end">
                                    {data.adl_point}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="text-center">
                                ไม่มีข้อมูล ADL
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
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

export default Adldatahistorytable;
