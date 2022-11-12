import React from 'react';
import Layout from '../components/Layout';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export default function FaqScreen() {
  return (
    <Layout title="FAQ">
      <div className="mx-auto w-5/6">
        <h1 className="mb-4 text-xl font-bold">FAQ</h1>
        <Disclosure
          defaultOpen={true}
          as="div"
          className="border-b-2 mb-5 pb-5"
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center py-2 text-left text-sm uppercase font-medium focus:outline-none focus-visible:none">
                <span>What is your refund policy?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black hover:rotate-180 hover:transform`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  If you&apos;re unhappy with your purchase for any reason,
                  email us within 90 days and we&apos;ll refund you in full, no
                  questions asked.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="border-b-2 mb-5 pb-5">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center py-2 text-left text-sm uppercase font-medium focus:outline-none focus-visible:none">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black hover:rotate-180 hover:transform`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  No.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="border-b-2 mb-5 pb-5">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center py-2 text-left text-sm uppercase font-medium focus:outline-none focus-visible:none">
                <span>Is team pricing available?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black hover:rotate-180 hover:transform`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  Yes! You can purchase a license that you can share with your
                  entire team.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="border-b-2 mb-5 pb-5">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center py-2 text-left text-sm uppercase font-medium focus:outline-none focus-visible:none">
                <span>Do you ship internationally?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black hover:rotate-180 hover:transform`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  Yes, we ship all over the world. Shipping costs will be
                  calculated and applied during checkout. We run discounts and
                  promotions all year, so subscribe to our newsletter for
                  exclusive deals.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="border-b-2 mb-5 pb-5">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center py-2 text-left text-sm uppercase font-medium focus:outline-none focus-visible:none">
                <span>How do I exchange my order?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black hover:rotate-180 hover:transform`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  Reach out to us through the contact form detailing what
                  item(s) you&apos;d like to exchange your order with. We will
                  get back to you within 24 hours with our return process.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="border-b-2 mb-5 pb-5">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center py-2 text-left text-sm uppercase font-medium focus:outline-none focus-visible:none">
                <span>How long will it take to get my order?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-black hover:rotate-180 hover:transform`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  It depends on where your order is being delivered to. National
                  orders will take 5-7 business days to arrive. Overseas
                  deliveries can take anywhere from 7-16 days.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </Layout>
  );
}
