bash -i -c "rosnode kill autonomous_operation"
bash -i -c "rostopic pub -1 move_speed std_msgs/Float32 \"data: 0\""
