"use client";
import React from "react";
import MyLabel from "../Texts/MyLabel";
import PriceInput from "./PriceInput";
import ZipInput from "./ZipInput";
import UsaFormatInput from "./UsaFormatInput";


const AppInput = ({
  label,
  name,
  errors,
  control,
  isLoading = false,
  placeholder,
  required,
  register,
  type,
  endIcon,
  startIcon,
  disabled,
  onSelect = false,
  options = [],
  edit = true,
  onCheck = false,
  onChange = false,
  onFileUpload = false,
  setValue,
  trigger,
  setError,
  suffix,
  className,
  watch
}) => {

  switch (type) {
    //select
    case "select":
      return (
        <div className="flex flex-col gap-1 ">
          {label && <MyLabel name={name} label={label} required={required} />}
          {edit ? <select
            {...(watch ? { value: watch(name) || "" } : {})}
            disabled={disabled}
            className={`border text-[12px] font-[400] rounded-md p-1.5 w-full ${disabled ? "cursor-not-allowed" : ""}`}
            {...register(name, { onChange: (e) => onSelect && onSelect(e) })}
          >
            <option value="" data_name=""> {isLoading ? "Loading..." : `Select ${label || ""}`}</option>
            {Array.isArray(options) &&
              options.map((ele, i) => {
                return (
                  <option key={i} value={ele.id}>
                    {ele.name}
                  </option>
                );
              })}
          </select> : watch && watch(name) || "Na"}
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    case "checkbox":

      return (
        <div className={`${className} flex items-center gap-1 `}>
          <input
            disabled={disabled}
            type="checkbox"
            {...register(name, { onChange: (e) => onCheck && onCheck(e) })}
            id={name}
          />
          <label
            className="text-b-sm select-none font-semibold hover:text-blue-700"
            htmlFor={name}
          >
            {label}
          </label>
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    //file
    case "file":
      return (
        <div className="flex flex-col gap-1 ">
          {label && <MyLabel name={name} label={label} required={required} />}

          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      )
    //defualt
    case "number":
      return (
        <div className="flex flex-col gap-1 w-full ">
          {label && <MyLabel name={name} label={label} required={required} />}
          <div className="border-green-200 border  w-full flex-1 rounded-md">
            <UsaFormatInput
              suffix={suffix}
              placeholder={placeholder}
              value={watch()[name]}
              onChange={(value) => {
                try {
                  if (!value) {
                    setError(name, undefined);
                    setValue(name, "");
                    trigger(name);
                  } else {
                    setValue(name, value);
                    trigger(name);
                  }
                } catch (error) {
                  console.log("appinput.js", error,)
                }
              }}
            />
          </div>

          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    case "price":
      return (
        <div>
          {label && <MyLabel name={name} label={label} required={required} />}
          <PriceInput
            placeholder={placeholder}
            suffix={suffix}
            value={watch()[name]}
            onChange={(value) => {
              try {
                if (!value) {
                  setError(name, undefined);
                  setValue(name, undefined);
                  trigger(name);
                } else {
                  setValue(name, value);
                  trigger(name);
                }
              } catch (error) {
                console.log("appinput.js", error,)
              }
            }}
          />
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    case "zip":
      return (
        <div>
          {label && <MyLabel label={label} required={required} />}
          <ZipInput
            suffix={suffix}
            value={watch()[name]}
            onChange={(value) => {
              try {
                if (!value) {
                  setError(name, undefined);
                  setValue(name, undefined);
                  trigger(name);
                } else {
                  setValue(name, value);
                  trigger(name);
                }
              } catch (error) {
                console.log("appinput.js", error,)
              }
            }}
          />
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    case "date":
      return (
        <div>
          {label && <MyLabel label={label} required={required} />}

        </div>
      );
    case "textarea":
      return (
        <div className="flex flex-col gap-1 ">
          {label && <MyLabel name={name} label={label} required={required} />}
          <div className=" border rounded-md flex items-center justify-between relative">
            {startIcon}{" "}
            <textarea className="w-full focus:outline-none p-2 bg-none border-none"  {...register(name, { onChange: (e) => onChange && onChange(e) })} cols="30" rows="10"></textarea>
            <div className=" absolute top-0 right-0 m-2">
              {endIcon}
            </div>
          </div>
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    default:
      return (
        <div className="flex flex-col gap-1 w-full">
          {label && <MyLabel name={name} label={label} required={required} />}
          {edit ? <div className={`border-green-200 border rounded-md flex items-center justify-between ${endIcon ? "pe-2" : ""}`}>
            {startIcon}{" "}
            <input
              disabled={disabled}
              className={`${endIcon ? "w-[97%]" : "w-full"
                } p-1.5 rounded-md  focus:outline-none placeholder:text-neutral-600 text-b-sm `}
              type={type}
              placeholder={placeholder}
              {...register(name, { onChange: (e) => onChange && onChange(e) })}
            />{" "}
            {endIcon}
          </div> : watch && watch(name) || "Na"}
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
  }
};

export default AppInput;
