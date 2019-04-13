import dayjs from 'dayjs'

export default function (value, format = 'YYYY-MM-DD HH-mm-ss') {
  return dayjs(value).format(format)
}
