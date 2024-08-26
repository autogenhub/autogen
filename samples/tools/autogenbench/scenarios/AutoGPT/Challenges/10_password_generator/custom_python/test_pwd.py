# Copyright (c) 2023 - 2024, Owners of https://github.com/autogen-ai
#
# SPDX-License-Identifier: Apache-2.0
#
# Original portions of this file are derived from https://github.com/microsoft/autogen under the MIT License, as of August 24, 2024, before release v0.2.35.
# SPDX-License-Identifier: MIT
import unittest

import password_generator


class TestPasswordGenerator(unittest.TestCase):
    def test_password_length(self):
        for i in range(8, 17):
            password = password_generator.generate_password(i)
            self.assertEqual(len(password), i)

    def test_value_error(self):
        with self.assertRaises(ValueError):
            password_generator.generate_password(7)
        with self.assertRaises(ValueError):
            password_generator.generate_password(17)

    def test_password_content(self):
        password = password_generator.generate_password()
        self.assertTrue(any(c.isdigit() for c in password))
        self.assertTrue(any(c in password_generator.string.punctuation for c in password))


if __name__ == "__main__":
    unittest.main()
