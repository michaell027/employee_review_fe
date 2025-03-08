"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { getAllManagers } from "@/libs/api/manager-service";
import type { Manager } from "@/libs/interfaces/manager";
import { useManager } from "@/libs/context/manager-context";
import { Employee } from "@/libs/interfaces/employee";
import { getManagerEmployees } from "@/libs/api/employee-service";
import Link from "next/link";

//TODO: In other components use @headlessui/react and @heroicons/react as well

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedManager, setSelectedManager } = useManager();
  const [testManagers, setTestManagers] = useState<Manager[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchManagers = async () => {
      const data = await getAllManagers();
      if (data === null || data.length === 0) {
        throw new Error("Failed to fetch managers.");
      }
      setTestManagers(data);
      setIsLoading(false);
    };

    fetchManagers().then(() => {});
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedManager && selectedManager.id) {
        const data = await getManagerEmployees(selectedManager.id);
        if (data === null) {
          setError("Failed to fetch employees.");
          setEmployees([]);
          setIsLoadingEmployees(false);
          return;
        }
        setEmployees(data);
        setIsLoadingEmployees(false);
      } else {
        setEmployees([]);
        setIsLoadingEmployees(false);
        setError("No manager selected");
      }
    };

    fetchEmployees().then(() => {});
  }, [selectedManager]);

  const handleUserSelect = (manager: Manager) => {
    setSelectedManager(manager);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image alt="logo" src="/logo.png" width={70} height={70} />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Employees
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {employees.length === 0 && !isLoadingEmployees && (
                <div className="p-4">
                  <p className="text-gray-600">No employees found.</p>
                </div>
              )}
              {isLoadingEmployees && (
                <div className="p-4">
                  <span className="inline-block w-20 h-5 bg-gray-200 rounded animate-pulse"></span>
                </div>
              )}
              <div className="p-4">
                {employees.length != 0 && !isLoadingEmployees && (
                  <>
                    {employees.map((employee) => (
                      <div
                        key={employee.name}
                        className="group relative flex items-center gap-x-6 rounded-md p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-md bg-gray-50 group-hover:bg-white">
                          {/*<item.icon*/}
                          {/*  aria-hidden="true"*/}
                          {/*  className="size-6 text-gray-600 group-hover:text-indigo-600"*/}
                          {/*/>*/}
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={`/employee/${employee.id}`}
                            className="block font-semibold text-gray-900"
                          >
                            {employee.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {employee.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            href="/employee"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Overview
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              {isLoading ? (
                <span className="inline-block w-20 h-5 bg-gray-200 rounded animate-pulse"></span>
              ) : selectedManager ? (
                selectedManager.name
              ) : (
                "Select Test User"
              )}
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute right-0 top-full z-10 mt-3 w-56 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-2">
                {testManagers.map((user) => (
                  <div
                    key={user.name}
                    className="group relative flex items-center gap-x-4 rounded-md p-2 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                      <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-auto">
                      <a
                        href="#"
                        className="block font-semibold text-gray-900"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUserSelect(user);
                        }}
                      >
                        {user.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-xs text-gray-600">
                        {user.position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image alt="" src="/logo.png" height={70} width={70} />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/employee"
                  className="-mx-3 block rounded-md px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Overview
                </Link>
              </div>
              <div className="py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-md py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    {isLoading ? (
                      <span className="inline-block w-20 h-5 bg-gray-200 rounded animate-pulse"></span>
                    ) : selectedManager ? (
                      selectedManager.name
                    ) : (
                      "Select Test User"
                    )}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {testManagers.map((user) => (
                      <a
                        key={user.name}
                        href="#"
                        className="block rounded-md py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUserSelect(user);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {user.name}
                      </a>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
