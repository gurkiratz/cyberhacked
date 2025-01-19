import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="w-full py-6 px-8">
      <Separator className="mb-6" />
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="text-sm text-muted-foreground">
            Helping users identify and avoid phishing attempts through
            interactive security awareness training.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Security Tips
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Training Resources
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Report Phishing
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground">
              Email: support@securityawareness.com
            </li>
            <li className="text-sm text-muted-foreground">
              Phone: (555) 123-4567
            </li>
          </ul>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="container text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Security Awareness Training. All rights
        reserved.
      </div>
    </footer>
  )
}
